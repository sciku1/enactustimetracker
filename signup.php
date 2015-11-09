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
	<h1>Can you give us a bit more information?</h1>
	<form method="POST" action="src/signup.php">
		<label for"fullname">Full Name</label><br>
		<input id="fullname" name="fullname" type="text"><br>
		<label for="pass">Choose a Password</label><br>
		<input id="pass" type="password"><br>
		<div id="projects"><h2>Choose projects.</h2>

		</div>
		<button type="submit">Submit</button>
	</form>	
</div>

<script type="text/javascript" src="js/signup.js"></script>
</html>
