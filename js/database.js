var database = {
	fillRandom: function(userNum) {
		users = [];
		for(var i = 1; i < userNum+1; i++) {
			var user = {
				id: i,
				username: faker.name.findName(),
				password: faker.internet.password(10, false, RegisterValidationOptions.passwordOptions.validation.pattern.value),
				email: faker.internet.email(),
				token: faker.internet.password(),
				lastLogin: Date.parse( faker.date.between("March 1, 2012", "March 1, 2015") )
			}
			users.push(user);
		}
		var str = JSON.stringify(users);
		localStorage.setItem("users", str);
		bootbox.alert("Random database was generated in localStorage");
	},
	getItem: function(item) {
		if(!!localStorage[item]) return localStorage[item];
	},
	getUser: function(obj) {
		if(localStorage.users) {
			var users = JSON.parse(localStorage.users);
			var found;
			for(var i = 0; i < users.length; i++) {
				for(key in obj) {
					if(obj[key] !== users[i][key]) {
						found = false;
						break;
					} else {
						found = true;
					}
				}
				if(found) return {
					index: i,
					info: users[i]
				}	
			}
		}
	},
	setProp: function(objForSearch, objForSet) {
		if(localStorage.users) {
			var users = JSON.parse(localStorage.users);
			var user = this.getUser(objForSearch);
			if(user){
				for(key in objForSet) {
					user.info[key] = objForSet[key];
				}
				users[user.index] = user.info;
				var str = JSON.stringify(users);
				localStorage.setItem("users", str);
			}
		}
	},
	saveNewUser: function(userObj) {
		var users = localStorage.users ? JSON.parse(localStorage.users) : [];
		var lastUserID = users.length - 1 || 0;
		user = {
			id: lastUserID + 1
		}
		$.extend(user, userObj);
		users.push(user);
		var result = JSON.stringify(users);
		localStorage.setItem("users", result);
	}
}
