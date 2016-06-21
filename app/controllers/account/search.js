import Ember from 'ember';

export default Ember.Controller.extend({
  search: Ember.inject.service('search-service'),
  lsClient: Ember.inject.service('ls-client'),
  _timer: null,
  subscription: null,

  actions: {
    search(market) {
      if (market.length <= 2) {
        this.set('results', null);
        return;
      }
      if (this._timer) {
        Ember.run.cancel(this._timer);
      }
      this._timer = Ember.run.later(this, function() {
        Ember.run.cancel(this._timer);
        const clientLs = this.get('lsClient').getLsClient();
        const store = this.store;
        let results = this.get('search').search(market);
        this.set('model', results.raw);
        this.set('subscription', new Lightstreamer.Subscription(
          "MERGE", results.streamingItems, ["BID", "OFFER"]
        ));
        this.get('subscription').setRequestedSnapshot("yes");
        this.get('subscription').addListener({
          onSubscriptionError: function(code, message) {
            console.log('subscription failure: ' + code + " message: " + message);
          },
          onItemUpdate: function(info) {
            var i = info.getItemPos();
            if (!store.hasRecordForId('search', i)) {
              store.push('search', {
                id: i
              });
            }
            store.find('search', i).then(function(search) {
              info.forEachChangedField(function(fieldName, fieldPos, value) {
                search.set(fieldName, value);
              });
              search.save();
            });
          },
        });
        clientLs.subscribe(this.get('subscription'));
      }, 500);
    }
  }
});
