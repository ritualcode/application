var modalLogout = {
	getDomElements:function(){
		this.$btn = $(".logoutLink");
	},
	bindListeners: function() {
		this.$btn.on("click", function() {
			bootbox.dialog({
			  message: "Are you sure you want to logout?",
			  title: "Logout",
			  buttons: {
			    success: {
			      label: "Yes",
			      className: "btn-success",
			      callback: function() {
			       	localStorage.removeItem("authToken");
			        location.hash = "";
			        $(window).trigger("logoutSuccess");
			      }
			    },
			    danger: {
			      label: "No",
			      className: "btn-danger",
			      callback: function() {
			      }
			    }
			  }
			});
		});
	},
	init: function(){
		this.getDomElements();
		this.bindListeners();
	}
}