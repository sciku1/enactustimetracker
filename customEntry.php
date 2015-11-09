<?php 
session_start();
if ($_SESSION["loggedin"] !== true) {
	header("Location: index.php");
}
?>
<!DOCTYPE html>
<html>
	<head>
	<title>Enactus Back End</title>
	<link rel="stylesheet" type="text/css" href="css/normalize.css">
	<link rel="stylesheet" type="text/css" href="css/members.css">
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
</head>
<body>
<div id="container" class="container">
	<nav>
		<ul><a href="member.php"><li>Home</li></a><a href="customEntry.php"><li>Custom Entry</li></a><a href="changeProjects.php"><li>Modify Projects</li></a><a href="logout.php"><li>Logout</li></a><?php if ($_SESSION["loggedin"] === true && $_SESSION["priviledge"] > 0) { echo "<a href='admin.php'><li>Admin</li></a>"; } ?></ul>
	</nav>
	<form method="POST" action="src/addCustomTime.php">
		<h1>Custom Entry</h1>
		<label for="event">Event Description</label><br>
		<input required id="event" type="text" name="event"><br>
		<label for="time">Time (Minutes)</label><br>
		<input required id="time" type="text" name="time"><br>
		<label for="eventDate">Date</label><br>
		<input required id="eventDate" type="date" name="eventDate"><br>
		<label for="dropdown">Indicate it's Category</label><br>
		<select required name="type" id="dropdown"></select><br>
		<button class="submit" id="submit">Submit</button>
	</form>
</div>
<script>
(function () {
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
</script>
</html>