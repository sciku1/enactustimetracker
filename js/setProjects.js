(function () {
	var request = new XMLHttpRequest();
	request.open('GET', 'js/projects.json', true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    var data = JSON.parse(request.responseText);
	    for (var i = 0; i < data.length; i++) { 
		    var checkbox = document.createElement("input");
		    var shortened = data[i].split(" ").join("_");
		    checkbox.type = "checkbox";
		    checkbox.name = "projects[]";
		    checkbox.id = shortened;
		    checkbox.value = data[i];
		    checkbox.className = "check";
		    var label = document.createElement("label");
		    label.innerHTML = data[i];
		    label.setAttribute("for", shortened);
		    label.className = "checkLabel";
		    var br = document.createElement("br");
		    document.getElementById("checklist").appendChild(checkbox);
		    document.getElementById("checklist").appendChild(label);
		    document.getElementById("checklist").appendChild(br);

	    }
	    var btn = document.createElement("button");
	    btn.id = "submit";
	    btn.className = "btnfirst";
	    btn.innerHTML = "Submit";
	    document.getElementById("checklist").appendChild(btn);
	  }
	};
	request.send();
})();
