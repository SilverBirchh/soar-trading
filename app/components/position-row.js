import Ember from 'ember';

export default Ember.Component.extend({
	isClosing: false,
	item: null,
	tagName: 'tr',
	size: null,
	isDisabled: Ember.computed('size', function(){
		const position = this.get('item.position');
		const size = this.get('size');
		if (size > 0 && size <= position.dealSize) {
			return false;
		}
		return true;
	}),
	actions: {
		toggleClass(position) {
			Ember.$(`#${position.dealId}`).toggleClass('inline-close');
			this.set('size', null);
			this.toggleProperty('isClosing');
		},
		close() {
			console.log('You shall not close');
		}
	}
});
