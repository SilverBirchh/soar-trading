import Ember from 'ember';

export default Ember.Controller.extend({
  market: null,
  dealNow: true,
  isBuy: null,

  actions: {
    dealNow(option) {
      this.set('dealNow', option);
    },
    changeDirection(direction) {
      this.set('isBuy', direction);
    }
  }
});
