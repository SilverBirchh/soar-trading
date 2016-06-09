/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'position-row',
  'Integration: PositionRowComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      const item = {
        market: {
          instrumentName: 'FTSE 100',
          expiry: 'DFB',
        },
        position: {
          direction: 'BUY',
          dealSize: '1.0',
          openLevel: '100',
        },
        marketData: {
          latest: '100',
          pnl: '0'
        }
      }
      this.set('item', item);
      this.render(hbs`{{position-row item=item}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
