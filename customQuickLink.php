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
		<ul><a href="member.php"><li>Home</li></a><a href="customEntry.php"><li>Custom Entry</li></a><li><a href="customQuickLink.php">Custom Quick Link</a></li><a href="changeProjects.php"><li>Modify Projects</li></a><a href="logout.php"><li>Logout</li></a><?php if ($_SESSION["loggedin"] === true && $_SESSION["priviledge"] > 0) { echo "<a href='admin.php'><li>Admin</li></a>"; } if ($_SESSION["priviledge"] > 1 ) { echo "<a href='master.php'><li>Master</li></a><a href='userManagement.php'><li>Users</li></a>";} ?></ul>
		<form method="POST" action="src/addCustomLink.php">
			<h1>Custom Quick Link</h1>
			<label for="label">Label</label><br>
			<input required id="label" type="text" name="label"><br>
			<label for="time">Time (Minutes)</label><br>
			<input required id="time" type="text" name="time"><br>
			<label for="dropdown">Category</label><br>
			<select required name="type" id="dropdown"></select><br>
			<button class="submit" id="submit">Submit</button>
		</form>
	</nav>
</div>
<script type="text/javascript" src="js/quickLinks.js"></script>
<script>
</script>
</html>
