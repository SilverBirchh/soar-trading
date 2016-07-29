import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
	normalizePayload: function(payload) {
		const result = [];
		payload.positions.forEach(function(obj, index) {
			obj['id'] = index;
			result.push(Ember.Object.create(obj));
		});
		return {
			'positions': result
		};
	}
});
