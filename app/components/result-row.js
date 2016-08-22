import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  result: null,
  click() {
    this.sendAction('deal', this.get('result'));
  }
});
