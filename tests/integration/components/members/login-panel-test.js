/* jshint expr:true */
import {
	expect
} from 'chai';
import {
	describeComponent,
	it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
	'members/login-panel',
	'Integration: MembersLoginPanelComponent', {
		integration: true
	},
	function() {
		it('renders with login disabled', function() {
			this.render(hbs `{{members/login-panel}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
		it('renders with login disabled with password entered', function() {
			this.set('password', 'Password');
			this.render(hbs `{{members/login-panel}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
		it('renders with login disabled with username entered', function() {
			this.set('username', 'Password');
			this.render(hbs `{{members/login-panel}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
		it('renders with login disabled with api entered', function() {
			this.set('api', 'PasswordPassword');
			this.render(hbs `{{members/login-panel}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});
	}
);
