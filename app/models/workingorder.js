import DS from 'ember-data';

export default DS.Model.extend({
  workingOrderData: DS.attr(),
  marketData: DS.attr(),
});
