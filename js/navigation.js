var navigation = {
	getDomElements: function() {
		this.$regLink = $(".registerLink").parent();
		this.$logLink = $(".loginLink").parent();
	},
	hideStartTabs: function() {
		this.$regLink.hide();
		this.$logLink.hide();
	},
	showStartTabs: function() {
		this.$regLink.show();
		this.$logLink.show();
	},
	createLoginBtn: function() {
		this.$logoutBtn = $("<button class='logoutBtn btn btn-sm btn-primary'>Logout</button>");
		this.$logoutBtn.css({"float":"right", "margin-right":"10px"});
		$(".header").append(this.$logoutBtn);
	},
	removeLoginBtn: function() {
		this.$logoutBtn.remove();
	},
	createUserTabs: function() {
		this.$userLink = $("<li><a href='#profile' class='profileLink'>Profile</a></li>");
		this.$profileLink = $("<li><a href='#users' class='usersLink'>Users</a></li>");
		this.$addUserLink = $("<li><a href='#add-user' class='usersLink'>New <small><span class='glyphicon glyphicon-plus'></span></small></a></li>");
		$(".navigation").append(this.$userLink, this.$profileLink, this.$addUserLink);
	},
	removeUserTabs: function() {
		this.$userLink.remove();
		this.$profileLink.remove();
		this.$addUserLink.remove();
	},
	bindLoginSuccess: function() {
		$(window).on("loginSuccess", function() {
			this.hideStartTabs();
			this.createLoginBtn();
			this.createUserTabs();
		}.bind(this));
	},
	bindLogoutSuccess: function() {
		$(window).on("logoutSuccess", function() {
			this.showStartTabs();
			this.removeUserTabs();
			this.removeLoginBtn();
		}.bind(this));
	},
	changeActiveTab: function() {
		var url = location.hash;
		if(url != "") {
			var $link = $(".navigation>li").find("a[href='" + url + "']");
			$link.parent().addClass("active");
			$link.parent().siblings().removeClass('active');
		} else {
			$(".navigation>li").removeClass('active');
		}
	},
	bindActive: function() {
		$(window).on("hashchange", navigation.changeActiveTab);
		window.addEventListener("load", navigation.changeActiveTab);
	},
	bindListeners: function() {
		this.bindLoginSuccess();
		this.bindLogoutSuccess();
		this.bindActive();
	},
	init: function() {
		this.getDomElements();
		this.bindListeners();
	}
}
