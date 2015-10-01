<?php 
session_start();
if ($_SESSION["loggedin"] === 1) {
	header("Location: login.html");
}?>
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
		<ul><a href="member.php"><li>Home</li></a><a href="addEntry.php"><li>Add Entry</li></a><a href="Support.php"><li>Contact</li></a></ul>
	</nav>
	
</div>
<script type="text/javascript" src="js/members.js"></script>
<script>
</script>
</html>
