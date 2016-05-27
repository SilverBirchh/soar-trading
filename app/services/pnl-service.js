import Ember from 'ember';

export default Ember.Service.extend({
	lsClient: Ember.inject.service('ls-client'),
	session: Ember.inject.service('session'),

	getPnl(epic, direction, openLevel, dealSize) {
		const marketData = {
			'pnl': '0',
		};
		const latestDirection = (direction === 'BUY') ? ['BID'] : ['OFFER'];
		const clientLs = this.get('lsClient').getLsClient();
		const market = [`MARKET:${epic}`];
		var subscription = new Lightstreamer.Subscription(
			"MERGE", market, latestDirection
		);
		subscription.setRequestedSnapshot("yes");
		subscription.addListener({
			onSubscription: function() {
				console.log('subscribed for pnl service');
			},
			onUnsubscription: function() {
				console.log('unsubscribed for pnl service');
			},
			onSubscriptionError: function(code, message) {
				console.log('subscription failure: ' + code + " message: " + message);
			},
			onItemUpdate: function(info) {
				info.forEachField(function(fieldName, fieldPos, value) {
					Ember.set(marketData, 'pnl', ((openLevel - value) * dealSize).toFixed(2));
				});
			},
		});
		clientLs.subscribe(subscription);
		return marketData;
	}
});
