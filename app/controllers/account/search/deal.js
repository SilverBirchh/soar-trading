import Ember from 'ember';

export default Ember.Controller.extend({
  dealService: Ember.inject.service('deal-service'),
  confirmService: Ember.inject.service('confirm-service'),
  notify: Ember.inject.service('notify'),

  market: null,
  dealNow: true,
  isBuy: true,

  onDeal(response /*status, data*/) {
    this.get('confirmService').confirm(response.dealReference, null, null, this.onConfirm.bind(this));
  },

  onConfirm(response) {
    if (response.dealStatus === "ACCEPTED") {
      this.get('notify').success(response.dealStatus);
      return;
    }
    this.get('notify').error(response.dealStatus);
  },

  actions: {
    dealNow(option) {
      this.set('dealNow', option);
    },
    changeDirection(direction) {
      this.set('isBuy', direction);
    },
    openPosition(dealParams) {
      dealParams.epic = this.get('market.epic');
      dealParams.expiry = this.get('market.expiry');
      dealParams.direction = this.get('isBuy') ? 'buy' : 'sell';
      this.get('dealService').openPosition(dealParams, this.onDeal.bind(this));
    },
    workingOrder(dealParams) {
      dealParams.epic = this.get('market.epic');
      dealParams.expiry = this.get('market.expiry');
      dealParams.direction = this.get('isBuy') ? 'buy' : 'sell';
      this.get('dealService').workingOrder(dealParams, this.onDeal.bind(this));
    }
  }
});
