var navigation = {
	bindLoginSuccess: function() {
		$(window).on("loginSuccess", function() {
			$(".logoutLink").remove();
			$(".loginLink").parent().hide();
			var $logoutLink = $("<li><a class='logoutLink'>Logout</a></li>");
			$(".navigation").append($logoutLink);
		});
	},
	bindLogoutSuccess: function() {
		$(window).on("logoutSuccess", function() {
			$(".logoutLink").remove();
			$(".loginLink").parent().show();
		});
	},
	bindActive: function() {
		$(window).on("hashchange", function(){
			var url = location.hash;
			if(url != "") {
				var $link = $(".navigation>li").find("a[href='" + url + "']");
				$link.parent().addClass("active");
				$link.parent().siblings().removeClass('active');
			} else {
				$(".navigation>li").removeClass('active');
			}
		});
	},
	bindListeners: function() {
		this.bindActive();
		this.bindLoginSuccess();
		this.bindLogoutSuccess();
	},
	init: function() {
		this.bindListeners();
	}
}
