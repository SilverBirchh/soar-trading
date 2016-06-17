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
    let result = prettify(42);
    expect(result).to.be.ok;
  });
});
