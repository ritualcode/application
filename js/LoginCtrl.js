var LoginCtrl = Object.create(InputCtrl);

LoginCtrl.getDomElements = function() {
	this.$form    = $("#loginForm");
	this.$inputs  = $("#loginForm input");
	this.$btn     = $("#loginBtn");
};
LoginCtrl.changeLastLogin = function() {
	var users = JSON.parse(localStorage.users);
	for(var i = 0; i < users.length; i++) {
		if(users[i].email == $("#email").val()) {
			users[i].lastLogin = Date.now();
			localStorage.setItem("authToken", users[i].token);
		}
	}
	var result = JSON.stringify(users);
	localStorage.setItem("users", result);
},
LoginCtrl.IsEmailAndPasseword = function() {
	var users = JSON.parse(localStorage.users);
	for(var i = 0; i < users.length; i++) {
		if(users[i].email == $("#email").val() &&
		   users[i].password == $("#password").val() ) {
		   return true
		} else {
			continue
		}
	}
}
LoginCtrl.bindSubmit = function(options) {
	this.$btn.on("click", function(e) {
		e.preventDefault();
		this.$form.trigger("submit");
	}.bind(this));

	this.$form.on("submit", function(e) {
		e.preventDefault();
		this.$inputs.each(function(i, el) {
			var key = Object.keys(options)[i];
			if(options[key].validation){
				this.validate(el, options[key]);
			}
		}.bind(this));
		
		if(Object.keys(Validator._errors).length == 0 &&
		   this.IsEmailAndPasseword() ) {
			  this.changeLastLogin();
			  location.hash = "#user";
		}
	}.bind(this));
};