import Ember from 'ember';

export default Ember.Route.extend({
  search: Ember.inject.service('search-service'),
  lsClient: Ember.inject.service('ls-client'),
  session: Ember.inject.service('session'),
  _timer: null,
  subscription: null,

  model: function() {
    new Egg("s,n,a,c,k", () => {
      this.set('session.session.content.authenticated.currentAccountId', 'Scooby Doo');
    }).listen();

		new Egg("b,a,t,m,a,n", () => {
			Ember.$('body').css("background","url(assets/images/app.jpg) no-repeat center center fixed");
      Ember.$('body').css("background-size","cover");
      Ember.$('div').css("background","transparent");
      Ember.$('h1').css("color","white");
      Ember.$('p').css("color","white");
		}).listen();

    return this.store.findAll('search');
  },
  deactivate() {
    this.send('unsubscribe');
  },

  actions: {
    unsubscribe() {
      if (this.get('subscription')) {
        const clientLs = this.get('lsClient').getLsClient();
        clientLs.unsubscribe(this.get('subscription'));
        this.get('store').unloadAll('search');
        this.set('subscription', null);
      }
    },
    search(market) {
      if (market.length <= 2) {
        this.send('unsubscribe');
        return;
      }
      if (this._timer) {
        Ember.run.cancel(this._timer);
      }
      this._timer = Ember.run.later(this, function() {
        Ember.run.cancel(this._timer);
        this.send('unsubscribe');
        const clientLs = this.get('lsClient').getLsClient();
        const store = this.store;
        let results = this.get('search').search(market);
        for (let i = 0; i < results.raw.length; i++) {
          if (!store.hasRecordForId('search', i)) {
            let data = {
              id: i.toString(),
              type: 'search',
              attributes: {
                instrumentName: results.raw[i].instrumentName,
                state: results.raw[i].state,
                tidyExpiry: results.raw[i].tidyExpiry,
                BID: results.raw[i].bid,
                OFFER: results.raw[i].offer,
                bidChange: null,
                offerChange: null,
              }
            };
            store.push(store.normalize('search', {
              data
            }));
          }
        }
        this.set('subscription', new Lightstreamer.Subscription(
          "MERGE", results.streamingItems, ["BID", "OFFER"]
        ));
        this.get('subscription').setRequestedSnapshot("yes");
        this.get('subscription').addListener({
          onSubscriptionError: function(code, message) {
            console.log('subscription failure: ' + code + " message: " + message);
          },
          onItemUpdate: function(info) {
            var i = info.getItemPos() - 1;
            store.find('search', i).then(function(search) {
              info.forEachChangedField(function(fieldName, fieldPos, newValue) {
                let oldValue = search.get(fieldName);
                let change = (newValue > oldValue ? 'rise' : 'fall');
                search.set(`${fieldName.toLowerCase()}Change`, change);
                search.set(fieldName, newValue);

                Ember.run.later(this, function() {
                  search.set(`${fieldName.toLowerCase()}Change`, null);
                }, 300);
              });
              search.save();
            });
          },
        });
        clientLs.subscribe(this.get('subscription'));
      }, 300);
    }
  }
});
