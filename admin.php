<?php 
session_start();
if (($_SESSION["loggedin"] !== true ) || ($_SESSION["priviledge"] < 1)) {
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
    <script src="https://apis.google.com/js/platform.js" async defer></script>
</head>
<body>
<div id="container" class="container">
	<nav>
		<ul><a href="member.php"><li>Home</li></a><a href="customEntry.php"><li>Custom Entry</li></a><a href="changeProjects.php"><li>Modify Projects</li></a><a onclick="LogOut()" href="logout.php"><li>Logout</li></a><?php if ($_SESSION["loggedin"] === true && $_SESSION["priviledge"] > 0) { echo "<a href='admin.php'><li>Admin</li></a>"; } ?></ul>
	</nav>
	<h1>Admin</h1>
	<div class="center">
		<div class="approve all" data-decide="approve" onclick="decideAll(this)">Approve All</div>
		<div class="deny all" data-decide="deny" onclick="decideAll(this)">Deny All</div>
	</div>
	<br>
</div>
<script type="text/javascript" src="js/admin.js"></script>
<script>
</script>
</html>
