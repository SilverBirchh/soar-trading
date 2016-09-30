import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['result'],

  /*
   * Result Object (See Search Model for properties)
   * @public
   * {result}
   */
  result: null,

  /*
   * sends deal action to the route
   * @public
   */
  click() {
    this.sendAction('deal', this.get('result'));
  },
});
