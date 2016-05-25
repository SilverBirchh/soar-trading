/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  logger
} from 'soar-trading/helpers/logger';

describe('LoggerHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = logger(42);
    expect(result).to.be.ok;
  });
});
