import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	actions: {
	invalidateSession() {
		localStorage.removeItem('lsClient');
		this.get('session').invalidate();
	}
}
});
