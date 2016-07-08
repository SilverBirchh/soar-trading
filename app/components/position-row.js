import Ember from 'ember';

export default Ember.Component.extend({
  pnlService: Ember.inject.service('pnl-service'),
  tagName: 'tr',
  isClosing: false,
  confirm: null,
  item: null,
  size: null,
  updateSize: Ember.observer('item.position.dealSize', function() {
    this.onSizeUpdate();
  }),
  setUpSubscription: function() {
    this.get('pnlService')
      .subscribe(this.get('item.market.epic'), this.get('item.position.direction'), this.onPnlUpdate.bind(this));
  }.on('init'),
  isDisabled: Ember.computed('size', function() {
    const position = this.get('item.position');
    const size = this.get('size');
    if (size > 0 && size <= position.dealSize) {
      return false;
    }
    return true;
  }),
  onPnlUpdate(data) {
    data.forEachField((fieldName, fieldPos, latest) => {
      let pnl = this.caluculatePnl(
        this.get('item.position.direction'),
        latest,
        this.get('item.position.openLevel'),
        this.get('item.position.dealSize')
      )
      this.get('item').setProperties({
        latest,
        pnl
      });
    });
  },
  onSizeUpdate() {
    this.set('item.pnl', this.caluculatePnl(
      this.get('item.position.direction'),
      this.get('item.latest'),
      this.get('item.position.openLevel'),
      this.get('item.position.dealSize')
    ));
  },
  caluculatePnl(direction, latest, openLevel, dealSize) {
    if (direction === 'BUY') {
      return ((latest - openLevel) * dealSize).toFixed(2);
    }
    return ((openLevel - latest) * dealSize).toFixed(2);
  },
  actions: {
    toggleClass(position) {
      Ember.$(`#${position.dealId}`).toggleClass('inline-close');
      this.set('size', null);
      this.toggleProperty('isClosing');
    },
    close() {
      this.sendAction('close', this.get('item.position'), this.get('size'));
      this.send('toggleClass', this.get('item.position'));
    }
  }
});
