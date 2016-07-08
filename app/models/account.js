import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  accountType: DS.attr('string'),
	preferred: DS.attr('boolean'),
	status: DS.attr('string'),
	accountName: DS.attr('string'),
	currency: DS.attr('string'),
  PNL: null,
  EQUITY: null,
  FUNDS: null,
  MARGIN: null,
  AVAILABLE_TO_DEAL: null
});
