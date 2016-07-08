import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  workingOrderData: DS.attr(),
  marketData: DS.attr(),
});
