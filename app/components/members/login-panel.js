import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),

	username: '',
	password: '',
	api: localStorage.getItem('apikey') || '',
	hasResponseMessage: null,

	validUsername: Ember.computed.gte('username.length', 5),
	validapi: Ember.computed.gte('api.length', 15),
	validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

	isValid: Ember.computed.and('validUsername', 'validPassword'),
	validWithApi: Ember.computed.and('isValid', 'validapi'),

	isDisabled: Ember.computed.not('validWithApi'),

	actions: {
		authenticate() {
			this.set('hasResponseMessage', null);
			const {
				username,
				password,
				api
			} = this.getProperties('username', 'password', 'api');
			return this.get('session').authenticate('authenticator:application', username, password, api)
				.catch((err) => {
					this.set('hasResponseMessage', "Invalid login. Please try again.");
				});
		}
	}
});
