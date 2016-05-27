import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	normalizePayload: function(payload) {
		const result = [];
		payload.workingOrders.forEach(function(obj, index) {
			obj['id'] = index;
			result.push(obj);
		});
		return {
			'workingorder': result
		};
	}
});
