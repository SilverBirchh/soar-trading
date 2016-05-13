import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
	sessionAuthenticator: Ember.inject.service(),
	sessionService: Ember.inject.service('session'),

	restore(data) {
		return new Ember.RSVP.Promise((resolve, reject) => {
			if (Ember.isEmpty(data.cstToken)) {
				reject(data);
			} else {
				resolve(data);
			}
		});
	},
	authenticate(username, password, api) {
		return new Ember.RSVP.Promise((resolve, reject) => {
			this.get('sessionAuthenticator').authenticate({
				username: username,
				password,
				api
			}, resolve, reject);
		});
	},

});
