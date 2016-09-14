import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	activeAccount: Ember.computed('session.session.content.authenticated.currentAccountId', function() {
		return this.get('session.session.content.authenticated.currentAccountId');
	}),
  activeName: Ember.computed('session.session.content.authenticated.currentAccountId', function() {
		for (let i = 0; i < this.get('session.session.content.authenticated.accounts').length; i++) {
      if (this.get('session.session.content.authenticated.accounts')[i].accountId === this.get('session.session.content.authenticated.currentAccountId')) {
        return this.get('session.session.content.authenticated.accounts')[i].accountName;
      }
    }
	}),
});
