import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
	name: 'sessionAuthenticator',
	session: Ember.inject.service(),
	authenticate(isSilentAuth, authData, resolve, reject) {
		let requestHeaders = this.getRequestHeaders(authData, isSilentAuth);

		this.resetInvalidSessionState();

		Ember.$.ajax(requestHeaders).then((response, msg, jqXHR) => {
			Ember.run(() => {
				this.handleAuthSuccess(authData, isSilentAuth, resolve, response, jqXHR);
			});
		}, this.handleAuthRejection.bind(this, reject));
	},
	getRequestHeaders(authData, isSilentAuth) {
		let apiHost = config.APP.api.apiHost;
		let requestHeaders = {
			dataType: 'json',
			type: isSilentAuth ? 'GET' : 'POST',
			url: `${apiHost}/session`,
		};
		requestHeaders.headers = {
			"Content-Type": "application/json; charset=UTF-8",
			"Accept": "application/json; charset=UTF-8",
			"X-IG-API-KEY": authData.api,
			"Version": "2"
		};

		if (isSilentAuth) {
			if (authData.sso) {
				console.log('hi');
				requestHeaders.headers['X-SECURITY-TOKEN'] = authData.sso;
			}
			if (authData.cst) {
				requestHeaders.headers.CST = authData.cst;
			}
		} else {
			requestHeaders.data = JSON.stringify({
				identifier: authData.username,
				password: authData.password
			});
		}

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
	handleAuthSuccess(authData, isSilentAuth, resolve, response, jqXHR) {
		let cst = isSilentAuth ? authData.cst : jqXHR.getResponseHeader('CST');
		let sso = isSilentAuth ? authData.sso : jqXHR.getResponseHeader('X-SECURITY-TOKEN');

		let responseData = {
			apiHost: config.APP.api.apiHost,
			authenticator: 'authenticator:application',
			clientId: response.clientId,
			cstToken: cst,
			currentAccountId: response.currentAccountId,
			ssoToken: sso,
		};

		resolve(isSilentAuth ? {
			authenticated: responseData
		} : responseData);
	}
});
