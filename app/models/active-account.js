import DS from 'ember-data';

export default DS.Model.extend({
	PNL: DS.attr(),
	EQUITY: DS.attr(),
	FUNDS: DS.attr(),
	MARGIN: DS.attr(),
	AVAILABLE_TO_DEAL: DS.attr(),
});
