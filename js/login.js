var button = document.getElementById("submit");
button.addEventListener("click", function () {
	if (validate(email) && document.getElementById("password").value !== "") {
		document.getElementById("form").submit();
	} else { 
		document.getElementById("failed").style.display = "block";
		document.getElementById("failed").innerHTML = "There was a problem logging in! Please try again.";
	}
	
});

function validate(email, pass) {
	var reg = /.+\@mtroyal\.ca/g;
	var email = document.getElementById("email").value;
	if (reg.test(email)) {
		return true;
	} else {
		return false;
	}
}