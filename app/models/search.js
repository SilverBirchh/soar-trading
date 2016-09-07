import DS from 'ember-data';

export default DS.Model.extend({
  state: DS.attr(),
  epic: DS.attr(),
  expiry: DS.attr(),
  instrumentName: DS.attr(),
  tidyExpiry: DS.attr(),
  BID: DS.attr(),
  OFFER: DS.attr(),
  bidChange: DS.attr(),
  offerChange: DS.attr(),
});
