var ProfileCtrl = Object.create(TableCtrl);

ProfileCtrl._user = null;

ProfileCtrl._setUser = function() {
	var authToken = database.getItem("authToken");
	var user = database.getUser({token: authToken});
	this.user = user ? user.info : null;
};

ProfileCtrl._fillTemplate = function() {
	var profileTmpl = this.applyTemplate("profileTmpl", this.user);
	$('.profileTable').html(profileTmpl);	
};

ProfileCtrl.init = function(){
	this._setUser();
	this._fillTemplate();
};