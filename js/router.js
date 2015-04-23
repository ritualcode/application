var router = {
	routes: {
		register: {
			html: "register.html"
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
			$container.load(rout.html);
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