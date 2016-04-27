import Ember from 'ember';

export default Ember.Controller.extend({
	headers: [{id: "log", title: "Login", dest: "members.login", isActive: true}, {id: "sign", title: "Register", dest: "members.sign-up", isActive: false}],
});
