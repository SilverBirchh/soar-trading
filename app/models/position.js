import DS from 'ember-data';

export default DS.Model.extend({

  market: DS.attr(),
  position: DS.attr(),
});
