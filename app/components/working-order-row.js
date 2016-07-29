import Ember from 'ember';

export default Ember.Component.extend({
  pnlService: Ember.inject.service('pnl-service'),
  tagName: 'tr',
  item: null,
  setUpSubscription: function() {
    this.get('pnlService')
      .subscribe(this.get('item.marketData.epic'), this.get('item.workingOrderData.direction'), this.onLatestUpdate.bind(this));
  }.on('init'),
  onLatestUpdate(data) {
    data.forEachField((fieldName, fieldPos, latest) => {
      this.get('item').setProperties({
        latest
      });
    });
  },
  actions: {
    delete(item) {
      this.sendAction('delete', item);
    }
  }
});
