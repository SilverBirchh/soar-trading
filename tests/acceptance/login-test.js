/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
// import { currentSession, authenticateSession, invalidateSession } from 'soar-trading/tests/helpers/ember-simple-auth';

describe('Acceptance: Login', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can login and redirct to home page', function() {
    visit('/members/login');
    fillIn('#username', 'Password');
    fillIn('#password', 'Password');
    fillIn('#api', 'PasswordPassword');

    andThen(function() {
      expect(currentPath()).to.equal('members.login');
    });
  });
});
