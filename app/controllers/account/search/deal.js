import Ember from 'ember';

export default Ember.Controller.extend({
  dealService: Ember.inject.service('deal-service'),

  market: null,
  dealNow: true,
  isBuy: true,

  onDeal() {

  },

  onConfirm() {

  },

  actions: {
    dealNow(option) {
      this.set('dealNow', option);
    },
    changeDirection(direction) {
      this.set('isBuy', direction);
    },
    openPosition(dealParams) {
      dealParams.direction = this.get('isBuy') ? 'buy' : 'sell';
      this.get('dealService').openPosition(this.get('market'), dealParams);
    }
  }
});
