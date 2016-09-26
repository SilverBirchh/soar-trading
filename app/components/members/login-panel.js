import Ember from 'ember';

/*
 * Login Panel - Front end validation
 */
export default Ember.Component.extend({
	session: Ember.inject.service('session'),

	username: '',

  /*
   * formatUsername String IG usernames are validated using this format
   */
	formatUsername: Ember.computed('username', function() {
		return `DEMO-${this.get('username').toUpperCase()}-LIVE`;
	}),
	password: '',
	api: localStorage.getItem('api') || '',
	hasResponseMessage: null,

	validUsername: Ember.computed.gte('username.length', 5),

	/*
	 * validapi boolean every api key is 15 characters long
	 */
	validapi: Ember.computed.gte('api.length', 15),
	validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

	isValid: Ember.computed.and('validUsername', 'validPassword'),
	validWithApi: Ember.computed.and('isValid', 'validapi'),

	isDisabled: Ember.computed.not('validWithApi'),

	actions: {

    /*
     * authenticate initiates authenticator by calling the application authenticator.
     * If this fails a warning message is shown
     */
		authenticate() {
			this.set('hasResponseMessage', null);
			const {
				formatUsername,
				password,
				api
			} = this.getProperties('formatUsername', 'password', 'api');
			return this.get('session').authenticate('authenticator:application', formatUsername, password, api)
				.catch(() => {
					this.set('hasResponseMessage', "Invalid login. Please try again.");
				});
		}
	}
});
