/* jshint expr:true */
import {
	expect
} from 'chai';
import {
	describeComponent,
	it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Pretender from 'pretender';

describeComponent(
	'positions-view',
	'Integration: PositionsViewComponent', {
		integration: true
	},
	function() {
		it('renders a info box with no positions', function() {
			const model = null;
			const type = 'Open Positions';
			this.set('model', model);
			this.set('type', type);
			this.render(hbs `{{positions-view model=model type=type}}`);
			expect(this.$('tbody > td:first').hasClass('alert-warning')).to.be.true;
		});

		it('renders with multiple open positions', function() {
      // TODO: FINISH
			server = new Pretender(function() {
				this.get('/positions', function() {
					const model = {
						"positions": [{
							"position": {
								"dealId": "DIAAAAAT7M642AZ",
								"dealSize": 12.0,
								"direction": "SELL",
								"openLevel": 15939.2,
								"currency": "GBP",
							},
							"market": {
								"instrumentName": "Japan 225",
								"expiry": "DFB",
								"epic": "IX.D.NIKKEI.DAILY.IP",
							}
						}, {
							"position": {
								"contractSize": 1.0,
								"dealId": "DIAAAAAT8VBEHAM",
								"direction": "SELL",
								"openLevel": 6104.6,
								"currency": "GBP",
							},
							"market": {
								"instrumentName": "FTSE 100",
								"expiry": "DFB",
								"epic": "IX.D.FTSE.DAILY.IP",
							}
						}]
					};
					return [200, {
						"Content-Type": "application/json"
					}, JSON.stringify(response)];
				});
			});

			const type = 'Open Positions';
			this.set('type', type);
      this.set('model', server);
			this.render(hbs `{{positions-view model=server type=type}}`);
		});
	}
);
