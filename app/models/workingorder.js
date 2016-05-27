import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  pnlService: Ember.inject.service('pnl-service'),

  workingOrderData: DS.attr(),
  marketData: DS.attr(),
  liveData: Ember.computed(function() {
		const market = this.get('marketData');
    const order = this.get('workingOrderData');
		const epic = market.epic;
    const direction = order.direction;
		return this.get('pnlService').getLatest(epic, direction);
	})
});
