import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	lsClient: Ember.inject.service('ls-client'),
	session: Ember.inject.service('session'),
	beforeModel() {
		const service = this.get('lsClient');
		service.connectToLs();
		this._super(...arguments);
	},
	activate: function() {
		const store = this.store;
		const clientLs = this.get('lsClient').getLsClient();

		const fields = ['PNL', 'EQUITY', 'FUNDS', 'MARGIN', 'AVAILABLE_TO_DEAL'];
		const accountID = `ACCOUNT:${this.get('session').get('data.authenticated.currentAccountId')}`;
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
				var i = info.getItemPos();
				if (!store.hasRecordForId('account', i)) {
					// Push an empty record
					store.push('account', {
						id: i
					});
				}

				store.find('account', i).then(function(account) {
					info.forEachChangedField(function(fieldName, fieldPos, value) {
						// Set field value on the account locally-persisted instance
						account.set(fieldName, value);
					});
					// Commit the changes on the local store
					account.save();
				});
			},
		});
		clientLs.subscribe(subscription);
	},
	model: function() {
		return this.store.findAll('account');
	}
});
