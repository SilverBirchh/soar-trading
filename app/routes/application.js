import Ember from 'ember';
import App from '../mixins/app';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, App, {
	session: Ember.inject.service('session'),
	beforeModel() {
		if (this.get('session.isAuthenticated')) {
			    this.transitionTo('account');
		}
  }
});
