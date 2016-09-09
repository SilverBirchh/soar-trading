import Ember from 'ember';

export default Ember.Component.extend({
  isBuy: null,
  size: null,
  validSize: Ember.computed.gte('size', 0.1),
  stop: null,
  stopType: 'normal',
  limit: null,

  isDisabled: Ember.computed.not('validSize'),

  actions: {
    openPosition() {
      this.sendAction('openPosition', {
        direction: this.get('isBuy'),
        size: this.get('size'),
        stop: this.get('stop'),
        stopType: this.get('stopType'),
        limit: this.get('limit'),
      });
    }
  }
});
