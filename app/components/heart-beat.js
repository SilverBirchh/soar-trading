import Ember from 'ember';

export default Ember.Component.extend({
  lsClient: Ember.inject.service('ls-client'),
  time: null,

  init() {
    this._super(...arguments);
    const _this = this;
    const clientLs = this.get('lsClient').getLsClient();

    const fields = ['HEARTBEAT'];

    var subscription = new Lightstreamer.Subscription(
      "MERGE", 'TRADE:HB.U.HEARTBEAT.IP', fields
    );
    subscription.setRequestedSnapshot("yes");
    subscription.addListener({
      onItemUpdate: function(/*info*/) {
        let date = new Date();
        let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        _this.set('time', time);
      },
      onSubscriptionError() {
        _this.set('time', 'Hearbeat not found.');
      },
      onUnsubscription() {
          _this.set('time', 'Heartbeat stopped.');
      }
    });
    clientLs.subscribe(subscription);
  },
});
