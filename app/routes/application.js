import Ember from 'ember';
import App from '../mixins/app';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, App, {
  session: Ember.inject.service('session'),
  lsClient: Ember.inject.service('ls-client'),
  activate: function() {
    const _this = this;

    $(window).on('beforeunload', () => {
      _this.get('session').invalidate();
    });
  },

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('account');
    }
  },
  actions: {
    error() {
      this.get('session').invalidate();
    },
  }
});
