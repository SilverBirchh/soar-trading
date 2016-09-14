import Ember from 'ember';

export default Ember.Service.extend({
  lsClient: Ember.inject.service('ls-client'),
  session: Ember.inject.service('session'),

  subscribe(accountId, callback, failure) {
    const clientLs = this.get('lsClient').getLsClient();
    const fields = ['PNL', 'EQUITY', 'FUNDS', 'MARGIN', 'AVAILABLE_TO_DEAL'];
    const accountID = `ACCOUNT:${accountId}`;
    var subscription = new Lightstreamer.Subscription(
      "MERGE", accountID, fields
    );
    subscription.addListener({
      onItemUpdate: callback,
      onUnsubscription: failure,
    });
    clientLs.subscribe(subscription);
  },
});
