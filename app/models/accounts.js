import DS from 'ember-data';

export default DS.Model.extend({
  accountId: DS.attr('string'),
  accountType: DS.attr('string'),
  preferred: DS.attr('string'),
  status: DS.attr('string'),
  accountName: DS.attr('string')
});
