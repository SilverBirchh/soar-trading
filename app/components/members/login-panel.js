import Ember from 'ember';

export default Ember.Component.extend({
	username: '',
	password: '',
	api: localStorage.getItem('apikey') || '',
	hasResponseMessage: false,

	validUsername: Ember.computed.gte('username.length', 5),
  validapi: Ember.computed.gte('api.length', 15),
  validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

	isValid: Ember.computed.and('validUsername', 'validPassword'),
	validWithApi : Ember.computed.and('isValid', 'validapi'),

	isDisabled: Ember.computed.not('validWithApi'),
});
