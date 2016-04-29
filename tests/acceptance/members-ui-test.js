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

describe('Acceptance: MembersUi', function() {
	let application;

	beforeEach(function() {
		application = startApp();
	});

	afterEach(function() {
		destroyApp(application);
	});

	it('can visit /members', function() {
		visit('/members');
		andThen(function() {
			expect(currentPath()).to.equal('members.login');
		});
	});
	it('can visit /members and show UI correctly', function() {
		visit('/members');
		andThen(function() {
			expect(this.$('#log').hasClass('active')).to.be.true;
		});
	});
	it('can visit /members and change to register and show UI correctly', function() {
		visit('/members');
		click('#sign');
		andThen(function() {
			expect(this.$('#sign').hasClass('active')).to.be.true;
		});
	});
	it('can visit /members and change to register see message', function() {
		visit('/members');
		click('#sign');
		andThen(function() {
			expect(this.$('#signup-message')).to.be.visible;
		});
	});
	it('can visit /members and change to register and then login and show UI correctly', function() {
		visit('/members');
		click('#sign');
		click('#log');
		andThen(function() {
			expect(this.$('#log').hasClass('active')).to.be.true;
		});
	});
	it('renders with login disabled', function() {
		visit('/members');
		andThen(function() {
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
	});
	it('renders with login disabled with password entered', function() {
		visit('/members');
		fillIn('#password', 'Password');
		andThen(function() {
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
	});
	it('renders with login disabled with username entered', function() {
		visit('/members');
		fillIn('#username', 'Password');
		andThen(function() {
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
	});
	it('renders with login disabled with api entered', function() {
		visit('/members');
		fillIn('#api', 'PasswordPassword');
		andThen(function() {
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
	});
	it('renders login disabled when api is less than 15 char', function() {
		visit('/members');
		fillIn('#username', 'Password');
		fillIn('#password', 'Password');
		fillIn('#api', 'Password');
		andThen(function() {
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
	});
	it('renders login disabled when password has special character', function() {
		visit('/members');
		fillIn('#username', 'Password');
		fillIn('#password', 'Password--==');
		fillIn('#api', 'PasswordPassword');
		andThen(function() {
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
	});
	it('can visit /members and login becomes avaliable once all fields are filled in.', function() {
		visit('/members');
		fillIn('#username', 'Password');
		fillIn('#password', 'Password');
		fillIn('#api', 'PasswordPassword');
		andThen(function() {
			expect(this.$('#login-submit').prop('disabled')).to.be.false;
		});
	});
});
