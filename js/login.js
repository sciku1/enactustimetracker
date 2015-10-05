function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var email = profile.getEmail();
	var fullname = profile.getName();
	var parameters="email="+email+"&fullname="+fullname;
	console.log(parameters);
	if (checkMRU(profile.getEmail()) === true ){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					if (xhttp.responseText == "loggedin") {
						window.location.assign("member.php");
					} else if (xhttp.responseText == "firsttime" ) {
						window.location.assign("firstLogin.php");	
					} else {
						console.log("something else is wrong.");
					}

		 }
	};
	xhttp.open("POST", "src/login.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);

	} else {
		window.location.assign("nonMRU.html");
		// handling if non mru		
	}

};

function checkMRU(email) {
	var re = /.+@mtroyal.ca/;
	var ans = re.exec(email);
	if (ans === null) {
		return false;
	} else {
		return true;
	}
}


