import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  lsClient: Ember.inject.service('ls-client'),
  subscription: null,

  search(market) {
    const that = this;
    const session = this.get('session');
    const clientLs = this.get('lsClient').getLsClient();
    let results = [];
    var streamingItems = [];
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

        if (results.length > 30) {
          break;
        }
        results.push(marketsData);
        if (marketsData.streamingPricesAvailable) {
          streamingItems.push("L1:" + marketsData.epic);
        }
      }
      if (that.get('subscription')) {
        clientLs.unsubscribe(that.get('subscription'));
      }
      that.set('subscription', new Lightstreamer.Subscription(
        "MERGE", streamingItems, ["BID", "OFFER"]
      ));
      that.get('subscription').setRequestedSnapshot("yes");
      that.get('subscription').addListener({
        onSubscription: function() {
          console.log('subscribed');
        },
        onUnsubscription: function() {
          console.log('unsubscribed');
        },
        onSubscriptionError: function(code, message) {
          console.log('subscription failure: ' + code + " message: " + message);
        },
        onItemUpdate: function(updateInfo) {
          var epic = updateInfo.getItemName().split(":")[1];
          var tidyEpic = epic.replace(/\./g, "_");
          updateInfo.forEachField(function(fieldName, fieldPos, value) {

          });
        }
      });
      clientLs.subscribe(that.get('subscription'));
    });
    return results;
  },

  unsubscribe() {
    if (this.get('subscription')) {
      const clientLs = this.get('lsClient').getLsClient();
      clientLs.unsubscribe(this.get('subscription'));
    }
  },
});
