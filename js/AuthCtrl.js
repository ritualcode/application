var AuthCtrl = {
	user: null,
	_setUser: function() {
		var authToken = database.getItem("authToken");
		var user = database.getUser({token: authToken});
		this.user = user ? user.info : null
	},
	_isUserExists: function() {
		return !!this.user;
	},
	_isRecentLogin: function() {
		if(this.user) {
			var lastLogin = moment(this.user.lastLogin, "DD.MM.YYYY hh:mm:ss");
			var now = moment(new Date(), "DD.MM.YYYY hh:mm:ss");
			return now.diff(lastLogin, "days") < 1;
		}
	},
	_changeUserLastLogin: function() {
		database.setProp({id: this.user.id}, { lastLogin: moment( Date.now() ).format('DD.MM.YYYY hh:mm:ss') });
	},
	init: function() {
		this._setUser();
		if ( this._isUserExists() && this._isRecentLogin() ) {
			location.hash = location.hash === "#users" ? "#users" : "#profile"
			this._changeUserLastLogin();
			$(window).trigger("loginSuccess");
		}
	}
}