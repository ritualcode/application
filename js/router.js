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
			LoginCtrl.init(LoginValidationOptions);
		},
		access: true
	},
	profile: {
		html: "profile.html",
		controller: function() {
			ProfileCtrl.init();
		},
		access: function() {
			return AuthCtrl._isUserExists() && AuthCtrl._isRecentLogin();
		}
	},
	users: {
		html: "users.html",
		controller: function(){
			//some code
		},
		access: function() {
			return AuthCtrl._isUserExists() && AuthCtrl._isRecentLogin();
		}
	}
}