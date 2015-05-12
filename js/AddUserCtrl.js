var AddUserCtrl = Object.create(InputCtrl);

AddUserCtrl.getDomElements = function() {
	this.$form   = $("#addNewUserForm");
	this.$inputs  = $("#addNewUserForm input");
	this.$btn    = $("#addNewUserBtn");
};
AddUserCtrl.saveNewUser = function() {
	var user = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val(),
		token: faker.internet.password(),
		lastLogin: moment().format('DD.MM.YYYY hh:mm:ss')
	}
	database.saveNewUser(user);
	bootbox.alert("User was saved");
	$(window).trigger("hashchange");
};
AddUserCtrl.bindSubmit = function(options) {
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
		}
	}.bind(this));
};