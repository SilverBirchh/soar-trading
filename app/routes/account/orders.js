import Ember from 'ember';

export default Ember.Route.extend({
	dealService: Ember.inject.service('deal-service'),
	confirmService: Ember.inject.service('confirm-service'),

	model: function() {
		return this.store.findAll('workingorder');
	},
	deactivate: function() {
		this.get('store').unloadAll('position');
	},
	actions: {
		delete(item) {
			const dealService = this.get('dealService');
			const dealRef = dealService.closeOrder(item.dealId);
			const dealPassed = this.get('confirmService').confirm(dealRef.dealRef);
			this.get('store').unloadAll('workingorder');
			this.refresh();
		}
	}
});
