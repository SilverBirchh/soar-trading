import Ember from 'ember';

export default Ember.Component.extend({
  market: '',

  actions: {
    search() {
      this.sendAction('search', this.get('market'));
    }
  }

});
