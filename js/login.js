function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var email = profile.getEmail();
	var fullname = profile.getName();
	var parameters="email="+email+"&fullname="+fullname;
		
	if (checkMRU(profile.getEmail()) === true ){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			console.log(xhttp.readyState);
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					console.log(xhttp.responseText);
					if (xhttp.responseText == "loggedin") {
						console.log(xhttp.responseText);
						window.location.assign("member.php");
					} else if (xhttp.responseText == "firsttime" ) {
						window.location.assign("firstLogin.php");	
					}
		 }
	};
	xhttp.open("POST", "src/login.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);

	} else {
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


