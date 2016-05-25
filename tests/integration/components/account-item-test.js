/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'account-item',
  'Integration: AccountItemComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#account-item}}
      //     template content
      //   {{/account-item}}
      // `);

      this.render(hbs`{{account-item}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
