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

describe('Acceptance: Navbar', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /features', function() {
    visit('/');
    click('#features');
    andThen(function() {
      expect(currentPath()).to.equal('features');
    });
  });

  it('can visit /about', function() {
    visit('/');
    click('#about');
    andThen(function() {
      expect(currentPath()).to.equal('about');
    });
  });

  it('can visit /index', function() {
    visit('/');
    click('#about');
    click('#home');
    andThen(function() {
      expect(currentPath()).to.equal('index');
    });
  });

  it('can visit /members/login', function() {
    visit('/');
    click('#login');
    andThen(function() {
      expect(currentPath()).to.equal('members.login');
    });
  });

  it('can visit /members/sign-up', function() {
    visit('/');
    click('#sign-up');
    andThen(function() {
      expect(currentPath()).to.equal('members.sign-up');
    });
  });
});
