import Ember from 'ember';

export default Ember.Route.extend({
  search: Ember.inject.service('search-service'),

  model: function() {
    return this.store.findAll('search');
  },
  deactivate() {
    this.get('search').unsubscribe();
  }
});
