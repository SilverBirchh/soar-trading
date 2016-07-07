import Ember from 'ember';

export default Ember.Service.extend({
  lsClient: Ember.inject.service('ls-client'),

  subscribe(epic, direction, callback) {
    const latestDirection = (direction === 'BUY') ? ['BID'] : ['OFFER'];
    const clientLs = this.get('lsClient').getLsClient();
    const market = [`MARKET:${epic}`];
    var subscription = new Lightstreamer.Subscription(
      "MERGE", market, latestDirection
    );
    subscription.setRequestedSnapshot("yes");
		subscription.addListener({
			onItemUpdate: callback
		});
    clientLs.subscribe(subscription);
  },

  getLatest(epic, direction) {
    const marketData = {
      'latest': '0',
    };
    const latestDirection = (direction === 'BUY') ? ['OFFER'] : ['BID'];
    const clientLs = this.get('lsClient').getLsClient();
    const market = [`MARKET:${epic}`];
    var subscription = new Lightstreamer.Subscription(
      "MERGE", market, latestDirection
    );
    subscription.setRequestedSnapshot("yes");
    subscription.addListener({
      onSubscription: this.get('onSubscription'),
      onUnsubscription: this.get('onUnsubscription'),
      onSubscriptionError: this.get('onSubscriptionError'),
      onItemUpdate: function(info) {
        info.forEachField(function(fieldName, fieldPos, value) {
          Ember.set(marketData, 'latest', value);
        });
      },
    });
    clientLs.subscribe(subscription);
    return marketData;
  },
  onSubscription() {
    return console.log('pnl service subscription service started.');
  },
  onUnsubscription() {
    return console.log('pnl service unsubscribe');
  },
  onSubscriptionError(code, message) {
    return console.log(`pnl service error: ${message} with code: ${code}.`);
  },
  calculatePnl(direction, latest, openLevel, dealSize) {
    if (direction === 'BUY') {
      return ((latest - openLevel) * dealSize).toFixed(2);
    } else {
      return ((openLevel - latest) * dealSize).toFixed(2);
    }
  }
});
