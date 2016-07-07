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

describeModule(
  'service:pnl-service',
  'PnlServiceService', {},
  function() {
    it('logs a subscription start', sinon.test(function() {
      let service = this.subject();
      sinon.spy(console, 'log');

      service.onSubscription();
      expect(console.log).to.be.called;
      console.log.restore();
    }));

    it('logs on unsubscription', sinon.test(function() {
      let service = this.subject();
      sinon.spy(console, 'log');

      service.onUnsubscription();
      expect(console.log).to.be.called;
      console.log.restore();
    }));

    it('logs on error', sinon.test(function() {
      let service = this.subject();
      sinon.spy(console, 'log');

      service.onSubscriptionError('12', 'mock');
      expect(console.log).to.be.called;
      console.log.restore();
    }));

    it('logs on error with correct code and message', sinon.test(function() {
      let service = this.subject();
      let log = sinon.spy(console, 'log');

      service.onSubscriptionError('12', 'mock');
      sinon.assert.calledWith(log, `pnl service error: mock with code: 12.`);
      console.log.restore();
    }));

    it('returns a marketData object', sinon.test(function() {
      let stub = sinon.stub();
      Lightstreamer = createLs();
      let service = this.subject({
        lsClient: stub
      });
      service.lsClient.getLsClient = function() {
        let mock = {
          subscribe() {
            return true;
          }
        };
        return mock;
      };
      const mockMarketData = {
        'pnl': '0',
        'latest': '0'
      };

      expect(service.getPnl('FTSE', 'BUY', 1, 1)).to.deep.equal(mockMarketData);
    }));

    it('returns a marketData object for latest price', sinon.test(function() {
      let stub = sinon.stub();
      Lightstreamer = createLs();
      let service = this.subject({
        lsClient: stub
      });
      service.lsClient.getLsClient = function() {
        let mock = {
          subscribe() {
            return true;
          }
        };
        return mock;
      };
      const mockMarketData = {
        'latest': '0'
      };

      expect(service.getLatest('FTSE', 'BUY')).to.deep.equal(mockMarketData);
    }));
  }
);
