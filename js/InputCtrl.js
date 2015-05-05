var InputCtrl = {
	getId: function(inputEl) {
		return inputEl.id;
	},
	getParentEl: function(inputEl) {
		return $(inputEl).parent();
	},
	getMessageEl: function(inputEl) {
		var inputId = this.getId(inputEl);
		var parentEl = this.getParentEl(inputEl);
		return $(parentEl).find("." + inputId + "-message");
	},
	getIconEl: function(inputEl) {
		var inputId = this.getId(inputEl);
		var parentEl = this.getParentEl(inputEl);
		return parentEl.find("." + inputId + "-icon");
	},
	markAsRequired: function(inputEl) {
		var iconEl = this.getIconEl(inputEl);
		iconEl.addClass("glyphicon-star");
	},
	stylizeError: function(inputEl) {
		var parentEl = this.getParentEl(inputEl);
		var iconEl = this.getIconEl(inputEl);
		parentEl.addClass("has-error");
		iconEl.addClass("glyphicon-remove");
	},
	stylizeSucces: function(inputEl) {
		var parentEl = this.getParentEl(inputEl);
		var iconEl = this.getIconEl(inputEl);
		parentEl.addClass("has-success");
		iconEl.addClass("glyphicon-ok");
	},
	stylize: function(inputEl, options) {
		var messageEl = this.getMessageEl(inputEl);
		$(inputEl).css(options.styles.input);
		$(messageEl).css(options.styles.message);
	},
	showFirstError: function(inputEl) {
		var inputId = this.getId(inputEl);
		var messageEl = this.getMessageEl(inputEl);
		var message = Validator._errors[inputId][Object.keys(Validator._errors[inputId])[0]];
		messageEl.text(message);
	},
	showLastError: function(inputEl) {
		var inputId = this.getId(inputEl);
		var messageEl = this.getMessageEl(inputEl);
		var lastRuleNum = Object.keys(Validator._errors[inputId]).length - 1;
		var message = Validator._errors[inputId][Object.keys(Validator._errors[inputId])[lastRuleNum]];
		messageEl.append(message);
	},
	showAllErrors: function(inputEl) {
		var inputId = this.getId(inputEl);
		var messageEl = this.getMessageEl(inputEl);
		for(key in Validator._errors[inputId]) {
			var message = Validator._errors[inputId][key] + "<br />";
			messageEl.append(message);
		}
	},
	showErrorMessages: function(inputEl, options) {
		if(options.showErrors == "first") {
			this.showFirstError(inputEl);
		}
		else if (options.showErrors == "all") {
			this.showLastError(inputEl);
		}
		else if (options.showErrors == "last") {
			this.showAllErrors(inputEl);
		}
	},
	hideErrorMessages: function(inputEl, options) {
		var parentEl = this.getParentEl(inputEl);
		var iconEl = this.getIconEl(inputEl);
		var messageEl = this.getMessageEl(inputEl);
		parentEl.removeClass("has-error has-success");
		iconEl.removeClass("glyphicon-ok glyphicon-remove");
		messageEl.empty();
		this.markAsRequired(inputEl, options);
	},
	validate: function(inputEl, options) {
		var inputId = this.getId(inputEl);
		this.hideErrorMessages(inputEl, options);
		Validator.run(inputId, options.validation, $(inputEl).val() );
		if(Object.keys(Validator._errors[inputId]).length == 0) {
			delete Validator._errors[inputId];
			this.stylizeSucces(inputEl);
		} else {
			if(options.showErrors) {
				this.showErrorMessages(inputEl, options);
			}
			this.stylizeError(inputEl);
		}
	},
	bindSubmit: function(options) {
		this.$form.on("submit", function(e) {
			e.preventDefault();
			this.$inputs.each(function(i, el) {
				var key = Object.keys(options)[i];
				if(options[key].validation){
					this.validate(el, options[key]);
				}
			}.bind(this));
		}.bind(this));

		this.$btn.on("click", function() {
			this.$form.trigger("submit");
		}.bind(this));
	},
	bindHideErrors: function(inputEl, options) {
		$(inputEl).on(options.hideErrorsOnEvent, function() {
			this.hideErrorMessages(inputEl, options);
		}.bind(this));
	},
	init: function(options) {
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
}