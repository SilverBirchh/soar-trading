/* jshint unused:vars */
import Ember from 'ember';

export default Ember.Service.extend({

  /*
   * session service
   * @public
   * @{service}
   */
  session: Ember.inject.service('session'),

  /*
   * AJAX call to switch accounts
   * @public
   * @param {String} id - Account Id to switch to
   * @param {Object} callback - method to call when AJAX call returns
   */
  switch (id, callback) {
    const session = this.get('session');
    const apiHost = session.session.content.authenticated.apiHost;
    let req = {};
    req.url = `${apiHost}/session`;
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
  },
  /*
   * AJAX retrieve watchlists. With no id passed through array of watchlists is
   * returned. With a watchlist ID the marekts within the list is returned.
   * @public
   * @param {String} id - Optional. Watchlist Id
   * @param {Object} callback - method to call when AJAX call returns
   */
  getWatchLists(id, callback) {
    const session = this.get('session');
    const apiHost = session.session.content.authenticated.apiHost;
    let req = {};
    req.url = id ? `${apiHost}/watchlists/${id}` : `${apiHost}/watchlists`;
    req.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json; charset=UTF-8",
      "X-IG-API-KEY": session.session.content.authenticated.api,
      "CST": session.session.content.authenticated.cstToken,
      "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
      "Version": 1,
    };

    Ember.$.ajax({
      type: 'GET',
      url: req.url,
      data: null,
      headers: req.headers,
      async: false,
    }).then(function(response, status, data) {
      callback(response);
    });
  }
});
