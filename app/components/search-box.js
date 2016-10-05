import Ember from 'ember';
import compare from '../mixins/sortable';
export default Ember.Component.extend(compare, {

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
   * The response is sorted by name.
   * @public
   */
  onGetWatchlist(response) {
    console.log('FHI MATE');
    this.set('watchlists', response.watchlists.sort(this.compare));
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
