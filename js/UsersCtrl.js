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
UsersCtrl.showDeleteUserModal = function(btn) {
	bootbox.dialog({
	  message: "Are you sure you want to delete this user?",
	  title: "Deleting User",
	  buttons: {
	    success: {
	      label: "Yes",
	      className: "btn-success",
	      callback: function() {
	        var $parent = btn.closest("tr");
			var userId = +$parent.find("td:first").text();
			database.deleteUser({id: userId});
			$parent.remove();
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
};

UsersCtrl.editUser = function(tr){
	var $collection = tr.find(".usernameCell, .emailCell");
	$collection.each(function(i, elem) {
		var text = $.trim( $(elem).text() );
		var input = $("<input class='form-control' type='text' value='" + text + "' />")
		$(elem).empty().prepend(input);
	});
};
UsersCtrl.saveUsersEdition = function(tr) {
	var $collection = tr.find(".usernameCell, .emailCell");
	$collection.each(function(i, elem) {
		var text = $.trim( $(elem).find("input").val() );
		$(elem).empty().prepend(text);
		var userId = +tr.find("td:first").text();
		var propToChange = elem.className.slice(0, -4);
		var obj = {}
		obj[propToChange] = text;
		database.setProp({id: userId}, obj)
	});
}
UsersCtrl.bindEditUser = function() {
	$(".btn-edit").on("click", function() {
		UsersCtrl.editUser( $(this).closest("tr") );
		$(this).hide();
		$(this).siblings(".btn-saveEdit").show();
	});
};
UsersCtrl.bindSaveUsersEdition = function() {
	$(".btn-saveEdit").on("click", function() {
		UsersCtrl.saveUsersEdition( $(this).closest("tr") );
		$(this).hide();
		$(this).siblings(".btn-edit").show();
	});
};
UsersCtrl.bindDeleteUser = function() {
	$(".btn-delete").on("click", function() {
		UsersCtrl.showDeleteUserModal( $(this) );
	});
};

UsersCtrl.bindListeners = function() {
	this.bindDeleteUser();
	this.bindEditUser();
	this.bindSaveUsersEdition();
};

UsersCtrl.init = function() {
	this._setUsers();
	this._fillTemplate();
	$('[data-toggle="tooltip"]').tooltip();
	this.bindListeners();
};