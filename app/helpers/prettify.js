import Ember from 'ember';

export function prettify(params) {
  if (params[0] === 'GOOD_TILL_CANCELLED') {
    return 'GTC';
  }
  return params;
}

export default Ember.Helper.helper(prettify);
