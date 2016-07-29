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
	onDelete(/*response*/) {
		this.get('store').unloadAll('workingorder');
		this.refresh();
	},
	actions: {
		delete(item) {
			this.get('dealService').closeOrder(item.dealId, this.onDelete.bind(this));
		}
	}
});
