import Ember from 'ember';

export function logger(object) {
  console.log(object);
}

export default Ember.Helper.helper(logger);
