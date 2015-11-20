(function () {
	// Javascript required to set the form up.
	var request = new XMLHttpRequest();
	request.open('POST', 'src/getProjects.php', true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    var data = JSON.parse(request.responseText);
	    var option = document.createElement("option");
		option.value = "General";
		option.innerHTML = "General";
		document.getElementById("dropdown").appendChild(option);
	    for (var i = 0; i < data.length; i++) { 
		    var option = document.createElement("option");
		    option.name = "projects[]"
		    option.value = data[i];
		    option.innerHTML = data[i];
		    document.getElementById("dropdown").appendChild(option);
	    }
	  }
	};
	request.send();
})();