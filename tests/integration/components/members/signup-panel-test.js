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
	'members/signup-panel',
	'Integration: MembersSignupPanelComponent', {
		integration: true
	},
	function() {
		it('renders with active section class set', function() {
			let headers = [{
				id: "log",
				title: "Login",
				dest: "members.login",
				isActive: true
			}, {
				id: "sign",
				title: "Register",
				dest: "members.sign-up",
				isActive: false
			}];
			this.set('headers', headers);

			this.render(hbs `{{members/signup-panel headers=headers}}`);
			expect(this.$()).to.have.length(1);
		});
	}
);
