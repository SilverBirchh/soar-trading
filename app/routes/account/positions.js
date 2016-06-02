import Ember from 'ember';

export default Ember.Route.extend({
	dealService: Ember.inject.service('deal-service'),
	model: function() {
		return this.store.findAll('position');
	},

	actions: {
		close(position, size) {
			this.get('dealService').closePosition(position, size);
			if (size == position.dealSize) {
				this.get('store').unloadAll('position');
			}
			this.refresh();
		}
	}
});
