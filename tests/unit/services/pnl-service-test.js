/* jshint expr:true */
/*global Lightstreamer:true */

import {
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import createLs from '../../helpers/create-ls';
import sinon from 'sinon';

describeModule(
  'service:pnl-service',
  'PnlServiceService', {},
  function() {
    it('calculates pnl of a buy', sinon.test(function() {
      let service = this.subject();
      expect(service.calculatePnl('BUY', 3000, 4000, 1)).to.be.equal('-1000.00');
    }));

    it('calculates pnl of a sell', sinon.test(function() {
      let service = this.subject();
      expect(service.calculatePnl('SELL', 3000, 4000, 1)).to.be.equal('1000.00');
    }));

    it('should call subscription', sinon.test(function() {
      let stub = sinon.stub();
      let service = this.subject({
        lsClient: stub
      });
      Lightstreamer = createLs();
      service.lsClient.getLsClient = function() {
        let mock = {
          subscribe() {
            return true;
          }
        };
        return mock;
      };
      let sub = sinon.spy(Lightstreamer, 'Subscription');

      service.subscribe('MOCK', 'BUY', true);
      sub.restore();
      sinon.assert.calledOnce(sub);
    }));
  }
);
