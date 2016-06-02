import Ember from 'ember';

export default Ember.Service.extend({
	session: Ember.inject.service('session'),

	confirm: function(dealRef) {
		const confirm = {
			'state': null,
		};
		const session = this.get('session');
		let req = {};
		req.url = `https://demo-api.ig.com/gateway/deal/confirms/${dealRef}`;
		req.headers = {
			"Content-Type": "application/json; charset=UTF-8",
			"Accept": "application/json; charset=UTF-8",
			"X-IG-API-KEY": session.session.content.authenticated.api,
			"CST": session.session.content.authenticated.cstToken,
			"X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
		};

		Ember.$.ajax({
			type: 'GET',
			url: req.url,
			data: null,
			headers: req.headers,
			async: false,
		}).then(function(response, status, data) {
			Ember.set(confirm, 'state', response.dealStatus);
		});
		return confirm;
	}
});
