import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	primaryKey: 'accountId',
	normalizeFindRecordResponse(store, type, payload) {
		debugger;
	}
});
