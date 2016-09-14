import Ember from 'ember';

export default Ember.Service.extend({
  lsClient: Ember.inject.service('ls-client'),

  subscribe(epic, direction, callback, failure) {
    const latestDirection = (direction === 'BUY') ? ['BID'] : ['OFFER'];
    const clientLs = this.get('lsClient').getLsClient();
    const market = [`MARKET:${epic}`];
    var subscription = new Lightstreamer.Subscription(
      "MERGE", market, latestDirection
    );
    subscription.addListener({
      onItemUpdate: callback,
      onUnsubscription: failure,
    });
    clientLs.subscribe(subscription);
  },
  calculatePnl(direction, latest, openLevel, dealSize) {
    if (direction === 'BUY') {
      return ((latest - openLevel) * dealSize).toFixed(2);
    } else {
      return ((openLevel - latest) * dealSize).toFixed(2);
    }
  }
});
