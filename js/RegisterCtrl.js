var RegisterCtrl = Object.create(InputCtrl);

RegisterCtrl.getDomElements = function() {
		this.$form            = $("#registerForm");
		this.$inputs          = $("#registerForm input");
		this.$btn     = $("#registerBtn");
}
RegisterCtrl.init = function(options) {
	this.getDomElements();
	this.$inputs.each(function(i, el) {
		var key = Object.keys(options)[i];
		if (options[key].validation &&
			options[key].validation.required &&
			options[key].validation.required.value) {
			this.markAsRequired(el);
		}
		if (options[key].styles &&
			options[key].styles.input &&
			options[key].styles.message) {
			this.stylize(el, options[key]);
		}
		if (options[key].hideErrorsOnEvent) {
			this.bindHideErrors(el, options[key]);
		}
	}.bind(this));
	
	this.bindSubmit(options);
}