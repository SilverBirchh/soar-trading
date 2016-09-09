import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  session: Ember.inject.service('session'),

  accountType: DS.attr('string'),
  preferred: DS.attr('boolean'),
  status: DS.attr('string'),
  active: Ember.computed('session.session.content.authenticated.currentAccountId', function() {
    for (let i = 0; i < this.get('session.session.content.authenticated.accounts').length; i++) {
      if (this.get('id') === this.get('session.session.content.authenticated.currentAccountId')) {
        return true;
      }
    }
    return false;
  }),
  accountName: DS.attr('string'),
  currency: DS.attr('string'),
  PNL: null,
  EQUITY: null,
  FUNDS: null,
  MARGIN: null,
  AVAILABLE_TO_DEAL: null
});
