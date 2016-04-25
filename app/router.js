import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("404", { path: "*path"});
  this.route('about');
  this.route('features');
  this.route('members', function() {
    this.route('login');
    this.route('sign-up');
  });
});

export default Router;
