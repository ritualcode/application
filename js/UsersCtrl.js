var UsersCtrl = Object.create(TableCtrl);

UsersCtrl._users = null;

UsersCtrl._setUsers = function() {
	var users = JSON.parse(database.getItem("users"));
	this.users = users ? users : null;
};

UsersCtrl._fillTemplate = function() {
	for(var i = 0; i < this.users.length; i++) {
		var usersTmpl = this.applyTemplate("usersTmpl", this.users[i]);
		$('.usersTable>tbody').append(usersTmpl);
	}
};

UsersCtrl.init = function() {
	this._setUsers();
	this._fillTemplate();
	$('[data-toggle="tooltip"]').tooltip()
}