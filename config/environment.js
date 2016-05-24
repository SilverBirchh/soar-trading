/* jshint node: true */

module.exports = function(environment) {
	var ENV = {
		contentSecurityPolicy: {
			'default-src': "'self'",
			'script-src': "'self' 'unsafe-eval' https://a.c-dn.net/b/0wNpa0.js",
			'font-src': "'self'",
		  'connect-src': "'self' ws://localhost:49155 wss://*.marketdatasystems.com/lightstreamer https://demo-api.ig.com/gateway/deal/session https://demo-apd.marketdatasystems.com/lightstreamer/create_session.js wss://demo-apd.marketdatasystems.com/lightstreamer wss://apd219b.marketdatasystems.com/lightstreamer wss://apd219b.marketdatasystems.com/lightstreamer",
			'img-src': "'self'",
			'style-src': "'self'",
			'media-src': "'self'"
		},
		modulePrefix: 'soar-trading',
		environment: environment,
		baseURL: '/',
		locationType: 'auto',
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
			}
		},
		APP: {
			api: {
				apiHost: 'https://demo-api.ig.com/gateway/deal'
			},
		}
	};
	ENV['ember-simple-auth'] = {
		authenticationRoute: 'index',
		routeAfterAuthentication: '/account'
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.baseURL = '/';
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
		ENV['simple-auth'] = {
			store: 'simple-auth-session-store:ephemeral'
		}
	}

	if (environment === 'production') {

	}

	return ENV;
};
