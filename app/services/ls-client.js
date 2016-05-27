import Ember from 'ember';

export default Ember.Service.extend({
	// TODO: Write unit tests and change session retrieve
	lsClient: null,

	connectToLs() {
		// Retrieve given sesion
		const session = JSON.parse(localStorage.getItem('ember_simple_auth:session'));
		// Instantiate Lightstreamer client instance
		const lsClient = new Lightstreamer.LightstreamerClient(session.authenticated.lsEndPoint);
		// Set up login credentials
		lsClient.connectionDetails.setUser(session.authenticated.currentAccountId);
		let password = `CST-${session.authenticated.cstToken}|XST-${session.authenticated.ssoToken}`;
		lsClient.connectionDetails.setPassword(password);

		// Add connection event listener callback functions
		// Note: the Lightstreamer library will transparently attempt to reconnect a number of times
		// in the event of communicationss errors
		lsClient.addListener({
			onListenStart: function() {
				console.log('ListenStart');
			},
			onStatusChange: function(status) {
				console.log('Lightstreamer connection status:' + status);
			}
		});

		// Connect to Lightstreamer
		lsClient.connect();
		this.set('lsClient', lsClient);
	},

	getLsClient() {
		return this.get('lsClient');
	}
});
