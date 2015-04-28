var router = {
	routes: {
		register: {
			html: "register.html",
			controller: ""
		},
		login: {
			html: "login.html",
			controller: ""
		}
	},
	run: function() {
		var $container = $(".main");
		var url = location.hash.slice(1);
		var $link = $("a[href='" + location.hash  + "']");
		if (url != "") {
			var rout = router.routes[url];
			$container.load(rout.html, null, function(){
				$(window).trigger(url + ".ready");
			});
			$link
				.parent().addClass("active")
				.siblings().removeClass("active");

		} else {
			$container.empty();
			$("li[class=active]").removeClass("active");
		}
	},
	bindListeners: function() {
		$(window).on("hashchange", router.run);
		window.addEventListener("load", router.run);
	},
	init: function () {
		this.bindListeners();
	}
}