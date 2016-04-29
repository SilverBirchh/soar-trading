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
		it('renders with correct href', function() {
			this.set('signUpLink', '#');
			this.render(hbs `{{members/signup-panel signUpLink=signUpLink}}`);
			expect(this.$('#signup-link').attr('href')).to.equal('#');
		});
	}
);
