import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  // redirect(model, transition) {
  //   if (this.get('session.isAuthenticated')) {
  //     this.transitionTo('/account');
  //   }
  // }
});
