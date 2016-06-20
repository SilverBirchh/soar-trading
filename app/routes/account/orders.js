import Ember from 'ember';

export default Ember.Route.extend({
	dealService: Ember.inject.service('deal-service'),

	model: function() {
		return this.store.findAll('workingorder');
	},
	deactivate: function() {
		this.get('store').unloadAll('workingorder');
		this.refresh();
	},
	actions: {
		delete(item) {
			const dealService = this.get('dealService');
			dealService.closeOrder(item.dealId);
			this.get('store').unloadAll('workingorder');
			this.refresh();
		}
	}
});
