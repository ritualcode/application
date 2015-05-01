$(function () {
	router.init(myRoutes);
});

var myRoutes = {
	register: {
		html: "register.html",
		controller: function() {
			RegisterCtrl.init(RegisterValidationOptions);
		}
	},
	login: {
		html: "login.html",
		controller: function() {
			LoginCtrl.init(LoginValidationOptions);
		}
	}
}