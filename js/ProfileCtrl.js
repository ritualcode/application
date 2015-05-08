var ProfileCtrl = Object.create(TableCtrl);

ProfileCtrl._user = {}

ProfileCtrl._getUser = function() {
	if (localStorage.users && localStorage.authToken) {
		var users = JSON.parse(localStorage.users);
		var authToken = localStorage.authToken;
		for(var i = 0; i < users.length; i++) {
			if( users[i].token == authToken) {
				this.user = users[i]
				return this.user;
			} else {
				continue;
			}
		}
	}
};

ProfileCtrl.init = function(){
	this._getUser();
	var profileTmpl = this.applyTemplate("profileTmpl", this.user);
	$('.profileTable').html(profileTmpl);
};