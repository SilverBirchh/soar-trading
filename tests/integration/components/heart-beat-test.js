/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'heart-beat',
  'Integration: HeartBeatComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#heart-beat}}
      //     template content
      //   {{/heart-beat}}
      // `);

      this.render(hbs`{{heart-beat}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);