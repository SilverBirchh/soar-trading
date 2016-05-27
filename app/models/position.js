import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	pnlService: Ember.inject.service('pnl-service'),

	market: DS.attr(),
	position: DS.attr(),
	marketData: Ember.computed(function() {
		const market = this.get('market');
		const position = this.get('position');
		const epic = market.epic;
		const direction = position.direction;
		const openLevel = position.openLevel;
		const dealSize = position.dealSize;
		return this.get('pnlService').getPnl(epic, direction, openLevel, dealSize);
	})

});
