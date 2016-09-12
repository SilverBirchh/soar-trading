import Ember from 'ember';

export default Ember.Component.extend({
  size: null,
  price: null,
  validSize: Ember.computed.gte('size', 0.1),
  validPrice: Ember.computed.gte('price', 0.1),

  goodTill: 'Cancelled',
  goodTills: Ember.String.w('Cancelled Date'),
  goodTillDate: null,
  showDatePicker: Ember.computed('goodTill', function() {
    if (this.get('goodTill') === 'Date') {
      return true;
    }
    return false;
  }),

  valid: Ember.computed.and('validSize', 'validPrice'),
  isDisabled: Ember.computed.not('valid'),

  actions: {
    changeGoodTill(value) {
      this.set('goodTill', value);
    },
    selectDate(value) {
      this.set('goodTillDate', new Date(value).getTime());
    },
    workingOrder() {
      this.sendAction('workingOrder', {
        direction: this.get('isBuy'),
        size: this.get('size'),
        level: this.get('price'),
        goodTill: this.get('goodTill'),
        goodTillDate: this.get('goodTillDate')
      });
    }
  }
});
