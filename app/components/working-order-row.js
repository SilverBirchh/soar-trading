import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  actions: {
    delete(item) {
      this.sendAction('delete', item);
    }
  }
});
