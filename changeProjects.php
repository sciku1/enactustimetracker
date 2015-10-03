<?php
session_start();
if ($_SESSION["loggedin"] !== true) {
	header("Location: login.html");
}?>
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
		<ul><a href="member.php"><li>Home</li></a><a href="customEntry.php"><li>Custom Entry</li></a><a href="changeProjects.php"><li>Modify Projects</li></a><a href="logout.php"><li>Logout</li></a></ul>
	</nav>
	<h1>Please indicate which projects you're a part of.</h1>
	<form method="POST" action="src/setProjects.php" id="checklist">
		
	</form>
</div>
<script type="text/javascript" src="js/setProjects.js">
	
</script>
</html>