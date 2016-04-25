/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'navbar-members',
  'Integration: NavbarMembersComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#navbar-members}}
      //     template content
      //   {{/navbar-members}}
      // `);

      this.render(hbs`{{navbar-members}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
