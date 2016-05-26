import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	balanceService: Ember.inject.service('balance-service'),

  accountType: DS.attr('string'),
	preferred: DS.attr('boolean'),
	status: DS.attr('string'),
	accountName: DS.attr('string'),
	currency: DS.attr('string'),

	balance: Ember.computed(function() {
		return this.get('balanceService').getBalances(this.get('id'));
	})
});
