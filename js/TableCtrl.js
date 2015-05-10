var TableCtrl = {
	applyTemplate: function(templateId, data){
		var template = $("#" + templateId).html();
		var keys = Object.keys(data);
		for(var i = 0; i < keys.length; i++) {
			var re = new RegExp("{{" + keys[i] + "}}", "g")
			template = template.replace(re, data[keys[i]]);
		}
		return template
	}
}