import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error() {
      this.transitionTo('/account/search');
    },
    didTransition() {
      if (!this.controllerFor("account/search/deal").get("market")) {
        this.transitionTo('/account/search');
      }
    },

  }
});
