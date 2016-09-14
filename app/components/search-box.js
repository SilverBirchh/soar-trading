import Ember from 'ember';

export default Ember.Component.extend({
  market: '',
  accountService: Ember.inject.service('account-service'),
  watchlists: [],

  onGetWatchlist(response) {
    this.set('watchlists', response.watchlists);
  },
  actions: {
    search() {
      this.sendAction('search', this.get('market'));
    },
    viewWatchlist() {
      if (this.get('watchlists').length > 0) {
        return this.get('watchlists').clear();
      }
      return this.get('accountService').getWatchLists(null, this.onGetWatchlist.bind(this));
    },
    viewWatchlistMarkets(id) {
      this.sendAction('viewWatchlistMarkets', id);
    }
  }
});
