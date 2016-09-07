import Ember from 'ember';

export default Ember.Component.extend({
  dealService: Ember.inject.service('deal-service'),

  isBuy: null,
  size: null,
  validSize: Ember.computed.gte('size', 0.1),
  stop: null,
  stopType: null,
  limit: null,

  isDisabled: Ember.computed.not('validSize'),

  onDeal() {

  },

  onConfirm() {

  },

  actions: {
    changeStop(type) {

    },

    openPosition() {
      console.log('I AM CALLED');
      this.get('dealService').openPosition({
        direction: this.get('isBuy'),
        size: this.get('size'),
        stop: this.get('stop'),
        stopType: this.get('sizeType'),
        limit: this.get('limit'),
      });
    }
  }
});
