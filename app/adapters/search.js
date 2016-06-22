import DS from 'ember-data';

export default DS.LSAdapter.extend({
	primaryKey: 'id',
	namespace: 'search'
});
