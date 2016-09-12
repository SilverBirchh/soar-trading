/* jshint expr:true */
import {
  expect
} from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import createLs from '../../helpers/create-ls';

describeComponent(
  'heart-beat',
  'Integration: HeartBeatComponent', {
    integration: true
  },
  function() {
    Lightstreamer = createLs();
    it('renders', function() {
      this.set('clientLs', {
        getLsClient() {
          return {
            subscribe() {
              console.log('hi');
            }
          }
        }
      })
      this.render(hbs `{{heart-beat clientLs=clientLs}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
