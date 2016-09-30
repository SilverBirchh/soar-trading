import Ember from 'ember';

export default Ember.Component.extend({

  /*
  * Search term
  * @public
  * @String
  */
  market: '',

  /*
   * accountService
   * @public
   * @Object
   */
  accountService: Ember.inject.service('account-service'),

  /*
   * Array of watchlists
   * @public
   * @Array
   */
  watchlists: [],

  /*
   * Whether to display watchlists in the DOM
   * @public
   * @Boolean
   */
  showWatchlists: false,

  /*
   * Sets local Watchlist array to the array from the AJAX response
   * @public
   */
  onGetWatchlist(response) {
    this.set('watchlists', response.watchlists);
  },

  /*
   * Retrieves Watchlist array on init. Therefore, list will only update on
   * re-entry of the route.
   * @public
   * @Promise
   */
  getWatchlists: function() {
    this.get('accountService').getWatchLists(null, this.onGetWatchlist.bind(this));
  }.on('init'),

  actions: {

    /*
     * Sends the search action to the route along with the search term
     * @public
     */
    search() {
      this.sendAction('search', this.get('market'));
    },

    /*
     * Whenther Watchlists should be shown of not
     * @public
     * @returns boolean
     */
    viewWatchlist() {
      if (this.get('showWatchlists')) {
        return this.set('showWatchlists', false);
      }
      return this.set('showWatchlists', true);
    },

    /*
     * Sends action to the route to view the markets within a specifc watchlist
     * (id)
     * @public
     */
    viewWatchlistMarkets(id) {
      this.sendAction('viewWatchlistMarkets', id);
    }
  }
});
