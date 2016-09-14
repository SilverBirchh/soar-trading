import Ember from 'ember';

export default Ember.Route.extend({
  search: Ember.inject.service('search-service'),
  accountService: Ember.inject.service('account-service'),
  lsClient: Ember.inject.service('ls-client'),
  session: Ember.inject.service('session'),
  _timer: null,
  subscription: null,
  results: Ember.Object.create({
    raw: [],
    streamingItems: []
  }),
  viewingWatchlist: false,

  model: function() {
    // new Egg("s,n,a,c,k", () => {
    //   this.set('session.session.content.authenticated.currentAccountId', 'Scooby Doo');
    // }).listen();
    //
    // new Egg("b,a,t,m,a,n", () => {
    //   Ember.$('body').css("background", "url(assets/images/app.jpg) no-repeat center center fixed");
    //   Ember.$('body').css("background-size", "cover");
    //   Ember.$('div').css("background", "transparent");
    //   Ember.$('h1').css("color", "white");
    //   Ember.$('p').css("color", "white");
    // }).listen();

    return this.store.findAll('search');
  },
  deactivate() {
    this.unsubscribe();
  },
  onSearch(response) {
    for (var i = 0; i < response.markets.length; i++) {
      var marketsData = response.markets[i];
      marketsData.tidyEpic = marketsData.epic.replace(/\./g, "_");
      marketsData.tidyExpiry = marketsData.expiry.replace(/ /g, "");
      marketsData.state = null;
      if (marketsData.marketStatus === 'EDITS_ONLY') {
        marketsData.state = 'assets/images/edit.png';
      } else if (marketsData.marketStatus === 'TRADEABLE') {
        marketsData.state = 'assets/images/open.png';
      } else {
        marketsData.state = 'assets/images/close.png';
      }

      if (this.get('results.raw').length > 30) {
        break;
      }
      this.get('results.raw').pushObject(marketsData);
      if (marketsData.streamingPricesAvailable) {
        this.get('results.streamingItems').pushObject(`L1:${marketsData.epic}`);
      }
    }
    this.subscribe(this.onUpdate.bind(this));
  },
  subscribe(callback) {
    const clientLs = this.get('lsClient').getLsClient();
    for (let i = 0; i < this.get('results.raw').length; i++) {
      if (!this.store.hasRecordForId('search', i)) {
        let data = {
          id: i.toString(),
          type: 'search',
          attributes: {
            epic: this.get('results.raw')[i].epic,
            expiry: this.get('results.raw')[i].expiry,
            instrumentName: this.get('results.raw')[i].instrumentName,
            state: this.get('results.raw')[i].state,
            tidyExpiry: this.get('results.raw')[i].tidyExpiry,
            BID: this.get('results.raw')[i].bid,
            OFFER: this.get('results.raw')[i].offer,
            bidChange: null,
            offerChange: null,
          }
        };
        this.store.push(this.store.normalize('search', {
          data
        }));
      }
    }
    this.set('subscription', new Lightstreamer.Subscription(
      "MERGE", this.get('results.streamingItems'), ["BID", "OFFER"]
    ));
    this.get('subscription').setRequestedSnapshot("yes");
    this.get('subscription').addListener({
      onItemUpdate: callback
    });
    clientLs.subscribe(this.get('subscription'));
  },
  onUpdate(info) {
    const store = this.store;
    var i = info.getItemPos() - 1;
    store.find('search', i).then((search) => {
      info.forEachChangedField((fieldName, fieldPos, newValue) => {
        this.updateStore(search, fieldName, newValue);
      });
      search.save();
    });
  },
  updateStore(store, fieldName, newValue) {
    let oldValue = store.get(fieldName);
    let change = (newValue > oldValue ? 'rise' : 'fall');
    store.set(`${fieldName.toLowerCase()}Change`, change);
    store.set(fieldName, newValue);
    Ember.run.later(this, function() {
      store.set(`${fieldName.toLowerCase()}Change`, null);
    }, 300);
  },
  unsubscribe() {
    if (this.get('subscription')) {
      const clientLs = this.get('lsClient').getLsClient();
      clientLs.unsubscribe(this.get('subscription'));
      this.get('results.raw').clear();
      this.get('results.streamingItems').clear();
      this.set('viewingWatchlist', false);
      this.get('store').unloadAll('search');
      this.set('subscription', null);
    }
  },
  onGetWatchlist(response) {
    this.set('watchlists', response.watchlists);
  },

  actions: {
    search(market) {
      if (market.length <= 2) {
        this.unsubscribe();
        return;
      }
      if (this._timer) {
        Ember.run.cancel(this._timer);
      }
      this._timer = Ember.run.later(this, function() {
        Ember.run.cancel(this._timer);
        this.unsubscribe();
        this.get('search').search(market, this.onSearch.bind(this));
      }, 300);
    },
    viewWatchlist() {
      this.get('accountService').getWatchLists(null, this.onGetWatchlist.bind(this));
    },
    deal(result) {
      this.transitionTo('account.search.deal');
      this.controllerFor('account.search.deal').set('market', result);
    },
    viewWatchlistMarkets(response) {
      this.set('viewingWatchlist', true);
      this.unsubscribe();
      return this.get('accountService').getWatchLists(response, this.onSearch.bind(this));
    }
  }
});
