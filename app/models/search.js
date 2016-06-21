import DS from 'ember-data';

export default DS.Model.extend({
  state: DS.attr(),
  instrumentName: DS.attr(),
  tidyExpiry: DS.attr(),
  bid: DS.attr(),
  offer: DS.attr(),
});
