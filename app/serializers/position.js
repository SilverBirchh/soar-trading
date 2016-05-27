import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	normalizePayload: function(payload) {
		const result = [];
		payload.positions.forEach(function(obj, index) {
			obj['id'] = index;
			result.push(obj);
		});
		return {
			'position': result
		};
	}
});
