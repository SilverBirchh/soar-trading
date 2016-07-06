/* jshint expr:true */
import {
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';


describeModule(
  'service:confirm-service',
  'ConfirmServiceService', {},
  function() {
    const mockDealRef = 'ABCABC';
    const session = {
      session: {
        content: {
          authenticated: {
            api: 'demo',
            cstToken: 'mockCst',
            ssoToken: 'mockSso'
          }
        }
      }
    };

    it('calls confirm endpoint', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      const ajax = this.spy($, 'ajax');

      service.confirm(mockDealRef);
      sinon.assert.calledOnce(ajax);
    }));

    it('sets confirm object on response', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            dealStatus: 'success'
          }, true, true);
        }
      });
      expect(service.confirm(mockDealRef)).to.deep.equal({
        state: 'success'
      });
    }));
  }
);
