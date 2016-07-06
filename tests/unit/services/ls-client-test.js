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
  'service:ls-client',
  'LsClientService', {},
  function() {
    const session = {
      session: {
        content: {
          authenticated: {
            api: 'demo',
            lsEndPoint: 'demo',
            cstToken: 'mockCst',
            ssoToken: 'mockSso'
          }
        }
      }
    };

    it('grabs lsClient', function() {
      let service = this.subject();
      service.lsClient = 'got me';
      expect(service.getLsClient()).to.be.equal('got me');
    });

    it('atempts to make a connection', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      var connect = this.spy(lsClient, 'connect');
      service.connectToLs();
      sinon.assert.calledOnce(connect);
    }));
  }
);
