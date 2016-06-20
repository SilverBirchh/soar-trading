import Ember from 'ember';

export default Ember.Route.extend({
  search: Ember.inject.service('search-service'),
  _timer: null,
  results: [],

  actions: {
    search(market) {
      if (market.length <= 2) {
        this.results = null;
        return;
      }
      const self = this;
      if (this._timer) {
        Ember.run.cancel(this._timer);
      };
      this._timer = Ember.run.later(this, function() {
        Ember.run.cancel(this._timer);
        this.results = this.get('search').search(market);
        console.log(this.results);
      }, 500);
    }
  }

});
