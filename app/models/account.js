import DS from 'ember-data';

export default DS.Model.extend({
	FUNDS: DS.attr(),
	MARGIN: DS.attr(),
	EQUITY: DS.attr(),
	AVAILABLE_TO_DEAL: DS.attr(),
	PNL: DS.attr()
});
