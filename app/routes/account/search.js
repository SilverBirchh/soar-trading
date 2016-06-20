import Ember from 'ember';

export default Ember.Route.extend({
  search: Ember.inject.service('search-service'),

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('account.search').set('results', []);
  },
  deactivate() {
    this.get('search').unsubscribe();
  }
});
