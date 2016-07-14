/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'route:account/search',
  'AccountSearchRoute',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });

    it('can has a deactivate hook to unsubscribe', function() {
      let route = this.subject();
      route.deactivate();
    });
  }
);
