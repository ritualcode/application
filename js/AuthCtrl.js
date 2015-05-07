var AuthCtrl = {
	user: {},
	_getAuthToken: function() {
		return !!localStorage.authToken ? localStorage.authToken : false;
	},
	_isUserExists: function() {
		var authToken = this._getAuthToken();
		if (authToken) {
			var users = JSON.parse(localStorage.users);
			for(var i = 0; i < users.length; i++) {
				if( users[i].token == authToken ) {
					this.user = users[i]; 
					return true;
				} else {
					continue;
				}
			}
		} else {
			return false;
		}
	},
	_isRecentLogin: function() {
		var lastLogin = this.user.lastLogin;
		return ( Date.now() - lastLogin ) < 86400000;
	},
	_changeUserLastLogin: function() {
		var users = JSON.parse(localStorage.users);
		for(var i = 0; i < users.length; i++) {
			if(users[i].id == this.user.id) {
				users[i].lastLogin = Date.now();
			}
		}
		var result = JSON.stringify(users);
		localStorage.setItem("users", result);
	},
	init: function() {
		if ( this._isUserExists() && this._isRecentLogin() ) {
			location.hash = "#user";
			this._changeUserLastLogin();
			$(window).trigger("loginSuccess");
		}
	}
}