import Ember from 'ember';

export default Ember.Component.extend({
	activeAccount: Ember.computed(function() {
    const session = JSON.parse(localStorage.getItem('ember_simple_auth:session'));
		return session.authenticated.currentAccountId;
  })
});
