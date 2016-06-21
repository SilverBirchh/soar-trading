/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import FindIndexMixin from 'soar-trading/mixins/find-index';

describe('FindIndexMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let FindIndexObject = Ember.Object.extend(FindIndexMixin);
    let subject = FindIndexObject.create();
    expect(subject).to.be.ok;
  });
});
