import DS from 'ember-data';

export default DS.Model.extend({
  accountType: DS.attr('string'),
  preferred: DS.attr('boolean'),
  status: DS.attr('string'),
  accountName: DS.attr('string')
});
