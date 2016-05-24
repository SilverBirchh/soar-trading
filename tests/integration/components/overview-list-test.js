/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'overview-list',
  'Integration: OverviewListComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#overview-list}}
      //     template content
      //   {{/overview-list}}
      // `);

      this.render(hbs`{{overview-list}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
