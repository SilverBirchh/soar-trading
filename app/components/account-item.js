import Ember from 'ember';

export default Ember.Component.extend({
  balanceService: Ember.inject.service('balance-service'),
  item: null,
  setUpSubscription: function() {
    this.get('balanceService')
      .subscribe(this.get('item.id'), this.onBalanceUpdate.bind(this), this.setUpSubscription.bind(this));
  }.on('init'),
  onBalanceUpdate(data) {
    data.forEachField((fieldName, fieldPos, latest) => {
      Ember.set(this.get('item'), fieldName, latest);
    });
  },

  actions: {
    switchAccount(id) {
      this.sendAction('switchAccount', id);
    }
  }
});
