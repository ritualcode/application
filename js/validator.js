var Validator = {
	run: function(field, validationRules, value) {
		this._errors[field] = {}
		for(var rule in validationRules) {
			var validationMethod = "_validate" + rule.charAt(0).toUpperCase() + rule.slice(1);
			if( this[validationMethod] ){
				if( this[validationMethod](validationRules[rule].value, value) ) {
					continue;
				} else {
					this._errors[field][rule] = validationRules[rule].message;
				}
			} else {
				if( validationRules[rule].value(value) ) {
					continue;
				} else {
					this._errors[field][rule] = validationRules[rule].message;
				}
			}
		}
	},
	_errors: {},
	_validateMaxlength: function(ruleValue, fieldValue){
		if( fieldValue.length > ruleValue) {
			return false;
		} else {
			return true;
		}
	},
	_validateMinlength: function(ruleValue, fieldValue){
		if( fieldValue.length < ruleValue) {
			return false;
		} else {
			return true;
		}
	},
	_validateRequired: function(ruleValue, fieldValue){
		if( ruleValue == true &&
			fieldValue == ""
			) {
			return false;
		} else {
			return true;
		}
	},
	_validatePattern: function(ruleValue, fieldValue) {
		if(!ruleValue.test(fieldValue)) {
			return false;
		} else {
			return true;
		}
	}
}