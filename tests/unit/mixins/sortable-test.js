/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import SortableMixin from 'soar-trading/mixins/sortable';

describe('SortableMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let SortableObject = Ember.Object.extend(SortableMixin);
    let subject = SortableObject.create();
    expect(subject).to.be.ok;
  });
});
