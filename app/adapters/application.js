import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
	session: Ember.inject.service('session'),
	type: 'GET',
	host: Ember.computed('session.authToken', function() {
		return this.get('session.session.content.authenticated.apiHost');
	}),
	headers: Ember.computed('session.authToken', function() {
		const session = this.get('session');
		return {
			"Content-Type": "application/json; charset=UTF-8",
			"Accept": "application/json; charset=UTF-8",
			"X-IG-API-KEY": session.session.content.authenticated.api,
			"CST": session.session.content.authenticated.cstToken,
			"X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken
		};
	})

});
