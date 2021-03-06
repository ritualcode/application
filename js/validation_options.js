var RegisterValidationOptions = {
	usernameOptions: {
		validation: {
			required: {
				value   : true,
				message : "Name is required"
			},
		},
		showErrors: "first",
		styles: {
			input: {},
			message: {
				"color": "red"
			}
		},
		hideErrorsOnEvent: "keydown"
	},
	emailOptions: {
		validation: {
			required: {
				value   : true,
				message : "E-mail is required"
			},
			maxlength: {
				value   : 16,
				message : "Your e-mail is too long"
			},
			minlength: {
				value   : 4,
				message : "Your e-mail is too short"
			},
			pattern: {
				value   : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
				message : "Your e-mail is not valid"
			}
			// justYahoo: {
			// 	value   : function(val) {
			// 		return /@yahoo.com\s*$/.test(val);
			// 	},
			// 	message : "Your domain is not yahoo.com"
			// }
		},
		showErrors: "first",
		styles: {
			input: {},
			message: {
				"color": "red"
			}
		},
		hideErrorsOnEvent: "keydown"
	},
	passwordOptions: {
		validation: {
			required: {
				value   : true,
				message : "Password is required"
			},
			maxlength: {
				value   : 16,
				message : "Your password is too long"
			},
			minlength: {
				value   : 6,
				message : "Your password is too short"
			},
			pattern: {
				value : /^(?=.*\d)[a-zA-Z0-9_]*$/,
				message: "Your password is not valid: at least 1 digit"
			}
		},
		showErrors: "first",
		styles: {
			input: {},
			message: {
				"color": "red"
			}
		},
		hideErrorsOnEvent: "keydown"
	},
	confirmPasswordOptions: {
		validation: {
			required: {
				value: true,
				message: "Confirm your password"
			},
			match: {
				value   : function(val) {
					return val == $("#password").val();
				},
				message : "Your password doesn't match"
			}
		},
		showErrors: "first",
		styles: {
			input: {},
			message: {
				"color": "red"
			}
		},
		hideErrorsOnEvent: "keydown"
	}
}

var LoginValidationOptions = {
	emailOptions: {
		validation: {
			required: {
				value   : true,
				message : "E-mail is required"
			},
			pattern: {
				value   : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
				message : "Your e-mail is not valid"
			},
			// exists: {
			// 	value: function(val){
			// 		if(localStorage.users) {
			// 			var users = JSON.parse(localStorage.users);
			// 			for(var i = 0; i < users.length; i++) {
			// 				if(users[i].email == val) {
			// 					return true;
			// 				} else {
			// 					continue;
			// 				}
			// 			}
			// 			return false;
			// 		} else {
			// 			return false;
			// 		}
			// 	},
			// 	message: "E-mail is not found"
			// }
		},
		showErrors: "first",
		styles: {
			input: {},
			message: {
				"color": "red"
			}
		},
		hideErrorsOnEvent: "keydown"
	},
	passwordOptions: {
		validation: {
			required: {
				value   : true,
				message : "Password is required"
			},
		},
		showErrors: "first",
		styles: {
			input: {},
			message: {
				"color": "red"
			}
		},
		hideErrorsOnEvent: "keydown"
	}

}

// var EditProfileValidationOptions = RegisterValidationOptions;
// EditProfileValidationOptions.passwordOptions.validation.required.value = false;
// EditProfileValidationOptions.confirmPasswordOptions.validation.required.value = !!$("#password").val();