var rootCtrl = {
	isLoginTabHidden: function() {
		return $(".loginLink").parent().css("display") === "none";
	},
	init: function() {
		$(".main").empty();
		if( !this.isLoginTabHidden() ) {
			$(".loginLink").parent().show();
		}
	}
}