/* jshint expr:true */
import {
	describe,
	it,
	beforeEach,
	afterEach
} from 'mocha';
import {
	expect
} from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import {
	currentSession,
	authenticateSession,
	invalidateSession
} from '../helpers/ember-simple-auth';

describe('Acceptance: Login - The different login flows', function() {
	let application;

	beforeEach(function() {
		application = startApp();
	});

	afterEach(function() {
		destroyApp(application);
	});

	it('can login and redirct to account page', function() {
		visit('/members/login');
		authenticateSession(application, {
			userId: 1,
			otherData: 'some-data'
		});

		andThen(function() {
			expect(currentPath()).to.equal('account');
			let session = currentSession(application);
			expect(session.get('data.authenticated.userId')).to.eql(1);
			expect(session.get('data.authenticated.otherData')).to.eql('some-data');
		});
	});

	it('can login and then not access login page', function() {
		visit('/members/login');
		authenticateSession(application, {
			userId: 1,
			otherData: 'some-data'
		});
		visit('/members/login');
		andThen(function() {
			expect(currentPath()).to.equal('index');
		});
	});

	it('can not visit account section when unauthorized', function() {
		invalidateSession(application);
		visit('/account');
		andThen(function() {
			expect(currentPath()).to.equal('index');
		});
	});
});
