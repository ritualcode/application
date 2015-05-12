var router = {
	routes: {},
	run: function() {
		var url = location.hash.slice(1);
		var $container = $(".main");
		
		if (url != "" &&
			router.routes[url] &&
			( (typeof router.routes[url].access == "boolean" && router.routes[url].access) ||
			  (typeof router.routes[url].access == "function" && router.routes[url].access()) ) &&
			router.routes[url].html) {
				var rout = router.routes[url];
				$container.load(rout.html, null, function(){
					if(rout.controller)	{
	    				rout.controller();
	    			}
	    		});
		} else {
			$container.empty();
			location.hash = "#login"
		}
	},
	bindListeners: function() {
		$(window).on("hashchange", router.run);
		window.addEventListener("load", router.run);
	},
	init: function (routes) {
		this.routes = routes;
		this.bindListeners();
	}
}

var myRoutes = {
	register: {
		html: "register.html",
		controller: function() {
			RegisterCtrl.init(RegisterValidationOptions);
		},
		access: true
	},
	login: {
		html: "login.html",
		controller: function() {
			LoginCtrl.init(RegisterValidationOptions);
		},
		access: true
	},
	profile: {
		html: "profile.html",
		controller: function() {
			ProfileCtrl.init();
		},
		access: function() {
			AuthCtrl._setUser();
			return AuthCtrl._isUserExists() && AuthCtrl._isRecentLogin();
		}
	},
	"edit-profile": {
		html: "edit_profile.html",
		controller: function() {
			EditProfileCtrl.init(EditProfileValidationOptions);
		},
		access: function() {
			AuthCtrl._setUser();
			return AuthCtrl._isUserExists() && AuthCtrl._isRecentLogin();
		}
	},
	"add-user": {
		html: "add_user.html",
		controller: function() {
			AddUserCtrl.init(RegisterValidationOptions);
		},
		access: function() {
			AuthCtrl._setUser();
			return AuthCtrl._isUserExists() && AuthCtrl._isRecentLogin();
		}
	},
	users: {
		html: "users.html",
		controller: function(){
			UsersCtrl.init();
		},
		access: function() {
			AuthCtrl._setUser();
			return AuthCtrl._isUserExists() && AuthCtrl._isRecentLogin();
		}
	}
}