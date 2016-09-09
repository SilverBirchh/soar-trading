import Ember from 'ember';

export default Ember.Service.extend({
	lsClient: null,
	session: Ember.inject.service('session'),

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
			onListenStart: this.get('onListenStart'),
			onStatusChange: this.get('onStatusChange'),
      onListenEnd: this.get('onStatusChange')
		});

		// Connect to Lightstreamer
		lsClient.connect();
		this.set('lsClient', lsClient);
	},

	onListenStart() {
		return console.log('ListenStart');
	},

	onStatusChange(status) {
		return console.log('Lightstreamer connection status:' + status);
	},

  restart() {
    this.get('lsClient').disconnect();
		this.connectToLs();
  },

	getLsClient() {
		return this.get('lsClient');
	}
});
