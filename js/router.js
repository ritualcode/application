var router = {
	routes: {},
	run: function() {
		var $container = $(".main");
		var url = location.hash.slice(1);
		var $link = $("a[href='" + location.hash  + "']");
		if (url != "") {
			var rout = router.routes[url];
			$container.load(rout.html, null, function(){
    			rout.controller();
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
	init: function (routes) {
		this.routes = routes;
		this.bindListeners();
	}
}