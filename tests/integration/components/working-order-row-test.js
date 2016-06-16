/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describeComponent(
  'working-order-row',
  'Integration: WorkingOrderRowComponent',
  {
    integration: true
  },
  function() {

    const item = {
      marketData: {
        instrumentName: 'FTSE 100',
        expiry: 'DFB',
      },
      workingOrderData: {
        direction: 'BUY',
        orderSize: 1,
        level: '100',
        goodTill: 'GTC'
      },
      liveData: {
        latest: '100',
      }
    };

    it('renders', function() {
      this.set('item', item);
      this.render(hbs`{{working-order-row item=item}}`);
      expect(this.$().text().indexOf('FTSE 100')).to.have.above(0);
    });

    it('calls the delete service', function() {
      let wasClalled = false;
      this.set('delete', () => {
        wasClalled = true;
      });

      this.set('item', item);
      this.render(hbs`{{working-order-row item=item delete=(action delete)}}`);
      Ember.run.next(() => {
        $('button:first').click();
        expect(wasClalled).to.be.true;
      });
    });
  }
);
