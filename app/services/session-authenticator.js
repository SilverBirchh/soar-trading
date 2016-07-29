import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
	name: 'sessionAuthenticator',
	session: Ember.inject.service(),

	authenticate(authData, resolve, reject) {
		let requestHeaders = this.getRequestHeaders(authData);

		this.resetInvalidSessionState();

		Ember.$.ajax(requestHeaders).then((response, msg, jqXHR) => {
			Ember.run(() => {
				this.handleAuthSuccess(authData, resolve, response, jqXHR);
			});
		}, this.handleAuthRejection.bind(this, reject));
	},
	getRequestHeaders(authData) {
		let apiHost = config.APP.api.apiHost;
		let requestHeaders = {
			dataType: 'json',
			type:  'POST',
			url: `${apiHost}/session`,
		};
		requestHeaders.headers = {
			"Content-Type": "application/json; charset=UTF-8",
			"Accept": "application/json; charset=UTF-8",
			"X-IG-API-KEY": authData.api,
			"Version": "2"
		};

		requestHeaders.data = JSON.stringify({
			identifier: authData.username,
			password: authData.password
		});

		return requestHeaders;
	},
	handleAuthRejection(reject) {
		let session = this.get('session');
		session.set('authenticationFailed', true);
		reject();
	},
	resetInvalidSessionState() {
		let session = this.get('session');
		session.set('authenticationFailed', null);
	},
	handleAuthSuccess(authData, resolve, response, jqXHR) {
		let cst = jqXHR.getResponseHeader('CST');
		let sso = jqXHR.getResponseHeader('X-SECURITY-TOKEN');
		localStorage.setItem('api', authData.api);

		let responseData = {
			apiHost: config.APP.api.apiHost,
			authenticator: 'authenticator:application',
			clientId: response.clientId,
			currentAccountId: response.currentAccountId,
			lsEndPoint: response.lightstreamerEndpoint,
			cstToken: cst,
			ssoToken: sso,
			api: authData.api
		};

		resolve(responseData);
	}
});
