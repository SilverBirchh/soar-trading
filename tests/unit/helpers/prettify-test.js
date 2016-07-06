/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  prettify
} from 'soar-trading/helpers/prettify';

describe('PrettifyHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = prettify(['GOOD_TILL_CANCELLED']);
    expect(result).to.be.equal('GTC');
  });
});
