import Ember from 'ember';

export default Ember.Controller.extend({
  search: Ember.inject.service('search-service'),
  _timer: null,
  results: [],

  actions: {
    search(market) {
      if (market.length <= 2) {
        this.set('results', null);
        return;
      }
      if (this._timer) {
        Ember.run.cancel(this._timer);
      }
      this._timer = Ember.run.later(this, function() {
        Ember.run.cancel(this._timer);
        this.set('results', this.get('search').search(market));
      }, 500);
    }
  }
});
