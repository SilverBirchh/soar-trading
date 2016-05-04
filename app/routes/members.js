import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
	redirect(model, transition) {
		if (transition.targetName === "members.index") {
			this.transitionTo('members.login');
		}
	}
});
