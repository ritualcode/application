var RegisterCtrl = Object.create(InputCtrl);

RegisterCtrl.getDomElements = function() {
		this.$form    = $("#registerForm");
		this.$inputs  = $("#registerForm input");
		this.$btn     = $("#registerBtn");
};
RegisterCtrl.saveNewUser = function() {
	var users = JSON.parse(localStorage.users);
	var lastUser = users[users.length - 1];
	var lastUserID = lastUser.id;
	var user = {
		id: lastUserID + 1,
		username: $("#name").val(),
		password: $("#password").val(),
		email: $("#email").val(),
		token: faker.internet.password(),
		lastLogin: Date.now()
	}
	users.push(user);
	var result = JSON.stringify(users);
	localStorage.setItem("users", result);
	localStorage.setItem("authToken", user.token);
};
RegisterCtrl.bindSubmit = function(options) {
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
		
		if(Object.keys(Validator._errors).length == 0) {
			this.saveNewUser();
			location.hash = "#profile";
			$(window).trigger("loginSuccess");
		}
	}.bind(this));
};