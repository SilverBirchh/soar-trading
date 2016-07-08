 /*jshint unused:false*/
 import Ember from 'ember';

 export default Ember.Service.extend({
   session: Ember.inject.service('session'),

   closePosition: function(position, size, callback) {
     const session = this.get('session');
     const direction = (position.direction === 'BUY') ? 'SELL' : 'BUY';
     let req = {};
     req.url = 'https://demo-api.ig.com/gateway/deal/positions/otc';
     req.headers = {
       "Content-Type": "application/json; charset=UTF-8",
       "Accept": "application/json; charset=UTF-8",
       "X-IG-API-KEY": session.session.content.authenticated.api,
       "CST": session.session.content.authenticated.cstToken,
       "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
       "Version": 1,
       "_method": "DELETE"
     };

     var bodyParams = {
       dealId: position.dealId,
       epic: null,
       expiry: null,
       direction: direction,
       size: size,
       level: null,
       orderType: "MARKET",
       timeInForce: null,
       quoteId: null
     };
     req.body = JSON.stringify(bodyParams);

     Ember.$.ajax({
       type: 'POST',
       url: req.url,
       data: req.body,
       headers: req.headers,
       async: false,
     }).then(function(response, status, data) {
       callback(response, position, size);
     });
   },

   closeOrder: function(dealId, callback) {
     const session = this.get('session');
     let req = {};
     req.url = `https://demo-api.ig.com/gateway/deal/workingorders/otc/${dealId}`;
     req.headers = {
       "Content-Type": "application/json; charset=UTF-8",
       "Accept": "application/json; charset=UTF-8",
       "X-IG-API-KEY": session.session.content.authenticated.api,
       "CST": session.session.content.authenticated.cstToken,
       "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
       "Version": 2,
       "_method": "DELETE"
     };

     Ember.$.ajax({
       type: 'DELETE',
       url: req.url,
       data: {},
       headers: req.headers,
       async: false,
     }).then(function(response, status, data) {
       callback(response)
     });
   }
 });
