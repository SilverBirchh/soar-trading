import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		toggleClass(position) {
			$(`#${position.dealId}`).toggleClass('inline-close');
			$(`#${position.dealId} form`).toggleClass('hidden');
		}
	}
});
