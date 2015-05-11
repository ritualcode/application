var LoginCtrl = Object.create(InputCtrl);

LoginCtrl.getDomElements = function() {
	this.$form    = $("#loginForm");
	this.$inputs  = $("#loginForm input");
	this.$btn     = $("#loginBtn");
};
LoginCtrl.changeLastLogin = function() {
	var user = database.getUser({
		email: $("#email").val()
	});
	localStorage.setItem("authToken", user.info.token);
	database.setProp({email: $("#email").val()}, {lastLogin: moment( Date.now() ).format('DD.MM.YYYY hh:mm:ss') });
},
LoginCtrl.IsEmailAndPasseword = function() {
	if(localStorage.users) {
		var user = database.getUser({
			email: $("#email").val(), 
			password: $("#password").val() 
		});
		if(user) {
			return true;
		} else {
			$(".password-message").text("Invalid e-mail or password");
		}
	} else {
		$(".password-message").text("User is not found");
	}
},
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
			  location.hash = "#profile";
			  $(window).trigger("loginSuccess");
		}
	}.bind(this));
};