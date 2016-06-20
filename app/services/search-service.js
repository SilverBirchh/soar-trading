import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),

  search(market) {
    const session = this.get('session');
    let results = null;
    let search = market.replace(/[^\w\s]/gi, '');

    var req = {};
    req.method = "GET";
    req.url = "https://demo-api.ig.com/gateway/deal/markets?searchTerm=" + search;
    req.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json; charset=UTF-8",
      "X-IG-API-KEY": session.session.content.authenticated.api,
      "CST": session.session.content.authenticated.cstToken,
      "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
    };

    Ember.$.ajax({
      type: req.method,
      url: req.url,
      data: {},
      headers: req.headers,
      async: false,
      mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null
    }).then(function(response, status, data) {
      results = response;
    });
    return results;
  },
});
