var modalLogout = {
	bindListeners: function() {
		$(".header").on("click", ".logoutBtn", function() {
			console.log("button was clicked");
			bootbox.dialog({
			  message: "Are you sure you want to logout?",
			  title: "Logout",
			  buttons: {
			    success: {
			      label: "Yes",
			      className: "btn-success",
			      callback: function() {
			       	localStorage.removeItem("authToken");
			        location.hash = "#login";
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
		this.bindListeners();
	}
}