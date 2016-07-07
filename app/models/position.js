import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  // TODO: TEST
  pnlService: Ember.inject.service('pnl-service'),

  init() {
    const market = this.get('market');
    const position = this.get('position');
    this.get('pnlService')
      .subscribe(market.epic, position.direction, this.onPnlUpdate.bind(this));
  },

  market: DS.attr(),
  position: DS.attr(),
  marketData: Ember.Object.create({
    pnl: '0',
    latest: '0'
  }),

	//isBuy: Ember.computede.equal('position.direction', 'BUY'),
	//isSell: Ember.computed.equal('position.direction', 'SELL'),

  onPnlUpdate(data) {
		const openLevel = this.get('position').openLevel;
		const dealSize = this.get('position').dealSize;
    data.forEachField((fieldName, fieldPos, latest) => {
			let pnl;
      if (this.get('position').direction === 'BUY') {
        pnl = ((latest - openLevel) * dealSize).toFixed(2);
      } else {
        pnl = ((openLevel - latest) * dealSize).toFixed(2);
      }
			this.get('marketData').setProperties({ latest, pnl });
    });
  }
});
