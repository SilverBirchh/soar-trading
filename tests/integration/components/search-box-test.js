/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'search-box',
  'Integration: SearchBoxComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#search-box}}
      //     template content
      //   {{/search-box}}
      // `);

      this.render(hbs`{{search-box}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);