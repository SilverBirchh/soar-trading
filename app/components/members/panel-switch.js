import Ember from 'ember';

export default Ember.Component.extend({
	headers: null,
	actions: {
		active(header) {
			const headers = this.get('headers');
			for (var i = 0; i < headers.length; i++) {
				Ember.$('#' + headers[i].id).removeClass('active');
			}
			Ember.$('#' + header.id).addClass('active');
		}
	}
});
