import Ember from 'ember';

export default Ember.Route.extend({
	redirect(model, transition) {
		if (transition.targetName === "members.index") {
			this.transitionTo('members.login');
		}
	}
});
