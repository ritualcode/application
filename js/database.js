function FillDatabase(userNum) {
	var database = {
		users: []
	}
	for(var i = 0; i < userNum; i++) {
		var user = {
			id: i,
			username: faker.name.findName(),
			password: faker.internet.password(10, false, RegisterValidationOptions.passwordOptions.validation.pattern.value),
			email: faker.internet.email(),
			token: Math.random(),
			lastLogin: Date.parse( faker.date.between("March 1, 2012", "March 1, 2015") )
		}
		database.users.push(user);
	}
	var str = JSON.stringify(database.users)
	localStorage.setItem("users", str);
}

FillDatabase(5);