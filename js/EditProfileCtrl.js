var EditProfileCtrl = Object.create(InputCtrl);

EditProfileCtrl.user = null;

EditProfileCtrl.getDomElements = function() {
	this.$form      = $("#editProfile");
	this.$inputs    = $("#editProfile input");
	this.$btn       = $("#editProfileBtn");
	this.$btnCancel = $("#editProfileCancelBtn");
};
EditProfileCtrl._setUser = function(){
	var authToken = database.getItem("authToken");
	var user = database.getUser({token: authToken});
	this.user = user ? user.info : null;
};
EditProfileCtrl._fillForm = function() {
	$("#username").val(this.user.username);
	$("#email").val(this.user.email);
	$("#password").val(this.user.password);
};
EditProfileCtrl.saveNewUser = function() {
	this.user.username = $("#username").val();
	this.user.email = $("#email").val();
	this.user.password = $("#password").val();
	var userId = this.user.id;
	database.setProp({id: userId}, this.user);
};
EditProfileCtrl.bindSubmit = function(options) {
	this.$btn.on("click", function(e) {
		e.preventDefault();
		this.$form.trigger("submit");
	}.bind(this));

	this.$form.on("submit", function(e) {
		e.preventDefault();
		this.$inputs.each(function(i, el) {
			var key = Object.keys(options)[i];
			if(options[key].validation){
				this.validate(el, options[key]);
			}
		}.bind(this));
		
		if(Object.keys(Validator._errors).length == 0) {
			this.saveNewUser();
			location.hash = "#profile"
		}
	}.bind(this));
};
EditProfileCtrl.bindCancelEdition = function() {
	this.$btnCancel.on("click", function() {
		location.hash = "#profile";
	});
};
EditProfileCtrl.init = function() {
	this._setUser();
	this._fillForm();
	InputCtrl.init.apply(this, arguments);
	this.bindCancelEdition();
};
