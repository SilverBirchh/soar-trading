/* jshint expr:true */
import {
	expect
} from 'chai';
import {
	describeComponent,
	it
} from 'ember-mocha';
import {
	beforeEach,
} from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

const sessionAuthenticator = Ember.Service.extend({
	name: 'sessionAuthenticator',
	authenticate(isSilentAuth, authData, resolve, reject) {
		return true;
	},
	getRequestHeaders(authData, isSilentAuth) {

	},
	handleAuthRejection(reject) {

	},
	resetInvalidSessionState() {

	},
	handleAuthSuccess(authData, isSilentAuth, resolve, response, jqXHR) {

	}
});


describeComponent(
	'members/login-panel',
	'Integration: MembersLoginPanelComponent', {
		integration: true,
	},
	function() {
		beforeEach(function() {
			this.set('password', 'password');
			this.set('username', 'password');
			this.set('api', 'passwordpassword');

			this.register('service:session-authenticator', sessionAuthenticator);
			// Calling inject puts the service instance in the test's context,
			// making it accessible as "locationService" within each test
			this.inject.service('session-authenticator', {
				as: 'sessionAuthenticator'
			});
		});

		it('renders with login disabled', function() {
			this.render(hbs `{{members/login-panel}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with password entered', function() {
			this.render(hbs `{{members/login-panel password=password}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with username entered', function() {
			this.render(hbs `{{members/login-panel username=username}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with api entered', function() {
			this.render(hbs `{{members/login-panel api=api}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with api less than 15 char', function() {
			this.set('api', 'password');
			this.render(hbs `{{members/login-panel password=password username=username api=api}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with password with special char', function() {
			this.set('password', 'password--==');
			this.render(hbs `{{members/login-panel password=password username=username api=api}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login enabled with all entered', function() {
			this.render(hbs `{{members/login-panel password=password username=username api=api}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.false;
		});

		it('renders with login enabled can call authenticate', function() {
			let createMocks = function() {
				let sessionService = Ember.Object.create({
					authenticate: sinon.spy()
				});
				return {
					sessionService,
				};
			};
			service = new createMocks();
			this.set('session', service.sessionService);
			this.render(hbs `{{members/login-panel session=service.sessionService password=password username=username api=api}}`);
			this.$('#login-submit').click();
			expect(service.get('sessionService.authenticate').calledOnce).to.be.true;
		});
	}
);
