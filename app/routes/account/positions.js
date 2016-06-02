import Ember from 'ember';

export default Ember.Route.extend({
	dealService: Ember.inject.service('deal-service'),
	confirmService: Ember.inject.service('confirm-service'),
	notify: Ember.inject.service('notify'),
	model: function() {
		return this.store.findAll('position');
	},
	deactivate: function() {
		this.get('store').unloadAll('position');
	},

	actions: {
		close(position, size) {
			const dealRef = this.get('dealService').closePosition(position, size);
			const dealPassed = this.get('confirmService').confirm(dealRef.dealRef);
			if (size == position.dealSize && dealPassed.state === "ACCEPTED") {
				this.get('store').unloadAll('position');
			}
			this.refresh();
			if (dealPassed.state === "ACCEPTED") {
				this.get('notify').success(dealPassed.state);
			} else {
				this.get('notify').error(dealPassed.state);
			}
		}
	}
});
