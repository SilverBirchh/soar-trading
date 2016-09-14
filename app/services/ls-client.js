import Ember from 'ember';

export default Ember.Service.extend({
	lsClient: null,
	session: Ember.inject.service('session'),
	routing: Ember.inject.service('-routing'),

	connectToLs() {
		// Retrieve given sesion
		const session = this.get('session');
		// Instantiate Lightstreamer client instance
		const lsClient = new Lightstreamer.LightstreamerClient(session.session.content.authenticated.lsEndPoint);
		// Set up login credentials
		lsClient.connectionDetails.setUser(session.session.content.authenticated.currentAccountId);
		let password = `CST-${session.session.content.authenticated.cstToken}|XST-${session.session.content.authenticated.ssoToken}`;
		lsClient.connectionDetails.setPassword(password);

		// Add connection event listener callback functions
		// Note: the Lightstreamer library will transparently attempt to reconnect a number of times
		// in the event of communication errors
		lsClient.addListener({
			onListenStart: this.get('onListenStart').bind(this),
			onStatusChange: this.get('onStatusChange').bind(this),
      onListenEnd: this.get('restart').bind(this),
			onServerError: this.get('serverError').bind(this),
		});

		// Connect to Lightstreamer
		lsClient.connect();
		this.set('lsClient', lsClient);
	},

	restart() {
		console.log('Restarting..');
		this.get('lsClient').disconnect();
		this.connectToLs();
	},

	onListenStart() {
		return console.log('ListenStart');
	},

	serverError(errorCode, errorMessage) {
		console.log('Lightstreamer connection status:' + errorMessage);
		this.restart();
	},

	onStatusChange(status) {
		console.log('Lightstreamer connection status:' + status);
	},

	getLsClient() {
		return this.get('lsClient');
	}
});
