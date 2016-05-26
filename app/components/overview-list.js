import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	activeAccount: Ember.computed(function() {
		return this.get('session.session.content.authenticated.currentAccountId');
	})
});
