/*jshint unused:false*/

import Ember from 'ember';
import findIndex from '../mixins/find-index';

export default Ember.Service.extend(findIndex, {
  session: Ember.inject.service('session'),

  search(market) {
    const session = this.get('session');
    let results = {
      raw: [],
      streamingItems: []
    };
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
      for (var i = 0; i < response.markets.length; i++) {
        var marketsData = response.markets[i];
        marketsData.tidyEpic = marketsData.epic.replace(/\./g, "_");
        marketsData.tidyExpiry = marketsData.expiry.replace(/ /g, "");
        marketsData.state = null;
        if (marketsData.marketStatus === 'EDITS_ONLY') {
          marketsData.state = 'assets/images/edit.png';
        } else if (marketsData.marketStatus === 'TRADEABLE') {
          marketsData.state = 'assets/images/open.png';
        } else {
          marketsData.state = 'assets/images/close.png';
        }

        if (results.raw.length > 30) {
          break;
        }
        results.raw.push(marketsData);
        if (marketsData.streamingPricesAvailable) {
          results.streamingItems.push("L1:" + marketsData.epic);
        }
      }
    });
    return results;
  },
});
