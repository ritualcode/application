var navigation = {
	init: function() {
		var $links = $(".navigation>li");
		$(window).on("hashchange", function(){
			var url = location.hash;
			if(url != "") {
				var $link = $links.find("a[href='" + url + "']");
				$link.parent().addClass("active");
				$link.parent().siblings().removeClass('active');
			} else {
				$links.removeClass('active');
			}
		});
	}
}
