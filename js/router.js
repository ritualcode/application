var router = {
	routes: {
		register: {
			html: "register.html",
			afterLoad: function() {
				register.init(validationOptions);
			}
		},
		login: {
			html: "login.html"
		}
	},
	run: function() {
		var $container = $(".main");
		var url = location.hash.slice(1);
		if (url != "") {
			var rout = router.routes[url];
			$container.load(rout.html, null, rout.afterLoad);
		} else {
			$container.load("start.html");
		}
	},
	bindListeners: function() {
		$(window).on("hashchange", router.run);
		window.addEventListener('load', router.run);
	},
	init: function () {
		this.bindListeners();
	}
}