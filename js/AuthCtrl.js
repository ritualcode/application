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
		var lastLogin = this.user.lastLogin;
		return ( Date.now() - lastLogin ) < 86400000;
	},
	_changeUserLastLogin: function() {
		database.setProp({id: this.user.id}, {lastLogin: Date.now()});
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