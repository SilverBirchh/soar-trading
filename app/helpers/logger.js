import Ember from 'ember';

export function logger(object/*, hash*/) {
  console.log(object);
}

export default Ember.Helper.helper(logger);
