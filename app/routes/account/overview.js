import Ember from 'ember';

export default Ember.Route.extend({
  accountService: Ember.inject.service('account-service'),
  session: Ember.inject.service('session'),
  lsClient: Ember.inject.service('ls-client'),

  model: function() {
    return this.store.findAll('account');
  },

  onSwitch(id, response, status, data) {
    this.set('session.session.content.authenticated.currentAccountId', id);
    this.set('session.session.content.authenticated.ssoToken', data.getResponseHeader('X-SECURITY-TOKEN'));
    this.get('lsClient').restart(true);
  },

  actions: {
    switchAccount(id) {
      this.get('accountService').switch(id, this.onSwitch.bind(this));
    }
  }
});
