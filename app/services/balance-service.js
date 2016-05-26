import Ember from 'ember';

export default Ember.Service.extend({
	lsClient: Ember.inject.service('ls-client'),
	session: Ember.inject.service('session'),
	balances: {
		'EQUITY': '0',
		'PNL': '0',
		'FUNDS': '0',
		'MARGIN': '0',
		'AVAILABLE_TO_DEAL': '0'
	},

	getBalances(accountId) {
		const balances = {
			'EQUITY': '0',
			'PNL': '0',
			'FUNDS': '0',
			'MARGIN': '0',
			'AVAILABLE_TO_DEAL': '0'
		};

		const clientLs = this.get('lsClient').getLsClient();
		const that = this;
		const fields = ['PNL', 'EQUITY', 'FUNDS', 'MARGIN', 'AVAILABLE_TO_DEAL'];
		const accountID = `ACCOUNT:${accountId}`;
		var subscription = new Lightstreamer.Subscription(
			"MERGE", accountID, fields
		);
		subscription.setRequestedSnapshot("yes");
		subscription.addListener({
			onSubscription: function() {
				console.log('subscribed');
			},
			onUnsubscription: function() {
				console.log('unsubscribed');
			},
			onSubscriptionError: function(code, message) {
				console.log('subscription failure: ' + code + " message: " + message);
			},
			onItemUpdate: function(info) {
				info.forEachField(function(fieldName, fieldPos, value) {
					Ember.set(balances, fieldName, value);
				});
			},
		});
		clientLs.subscribe(subscription);
		return balances;
	},
});
