/* jshint expr:true */
/*jshint unused:false*/
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
	authenticateSession,
	invalidateSession
} from '../helpers/ember-simple-auth';
import createLs from '../helpers/create-ls';
import Ember from 'ember';

let lsMock = Ember.Service.extend({
	lsClient: {
		subscribe() {
			console.log('mock');
		}
	},
	connectToLs: function() {
		console.log("Acceptance Mock!");
	},
	getLsClient: function() {
		return this.get('lsClient');
	},
});

describe('Acceptance: Login - The different login flows', function() {
	let application;

	beforeEach(() => {
		application = startApp();
		application.register('service:mockLs', lsMock);
		application.inject('route', 'lsClient', 'service:mockLs');
		let Lightstreamer = createLs();
	});

	afterEach(function() {
		destroyApp(application);
	});

	it('can login and redirct to account page', function() {
		visit('/members/login');
		authenticateSession(application, {
			authenticated: {
				userId: 1,
				lsEndPoint: 'mock',
				currentAccountId: 'ABCABC',
				cstToken: '123123',
				ssoToken: 'ssosso'
			}
		});
		andThen(function() {
			expect(currentPath()).to.equal('account.index');
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
