import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	isClosing: false,
	confirm: null,
	item: null,
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
			this.sendAction('close', this.get('item.position'), this.get('size'));
			this.send('toggleClass', this.get('item.position'));
		}
	}
});
