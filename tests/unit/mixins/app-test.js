/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import AppMixin from 'soar-trading/mixins/app';

describe('AppMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let AppObject = Ember.Object.extend(AppMixin);
    let subject = AppObject.create();
    expect(subject).to.be.ok;
  });
});
