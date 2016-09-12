import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),

  switch (id, callback) {
    const session = this.get('session');
    let req = {};
    req.url = 'https://demo-api.ig.com/gateway/deal/session';
    req.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json; charset=UTF-8",
      "X-IG-API-KEY": session.session.content.authenticated.api,
      "CST": session.session.content.authenticated.cstToken,
      "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
      "Version": 1,
    };

    var bodyParams = {
      "accountId": id,
      "defaultAccount": "true"
    };
    req.body = JSON.stringify(bodyParams);

    Ember.$.ajax({
      type: 'PUT',
      url: req.url,
      data: req.body,
      headers: req.headers,
      async: false,
    }).then(function(response, status, data) {
      callback(id, ...arguments);
    });
  }
});
