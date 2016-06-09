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
	'account-item',
	'Integration: AccountItemComponent', {
		integration: true
	},
	function() {
		it('renders with preferred account', function() {
			const item = {
        id: 'ABCABC',
        preferred: true,
				accountType: 'CFD',
				accountName: 'Demo-Spread bet',
				currency: 'GBP',
				status: 'ENABLED',
				balance: {
          FUNDS: 0,
          MARGIN: 0,
          EQUITY: 0,
          AVAILABLE_TO_DEAL: 0,
          PNL: 0,
				}
			};

      this.set('item', item);
			this.render(hbs `{{account-item item=item}}`);
			expect(this.$(".panel-title").text().trim()).to.be.equal('ABCABC - Preferred');
		});
	}
);
