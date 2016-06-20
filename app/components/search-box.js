import Ember from 'ember';

export default Ember.Component.extend({
  search: Ember.inject.service('search-service'),
  market: '',

  actions: {
    search() {
      this.sendAction('search', this.get('market'));
    }
  }

});
