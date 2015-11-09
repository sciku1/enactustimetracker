<html lang="en">
  <head>
    <meta name="google-signin-client_id" content="799685841780-081jvai8o99t35va1dvpjmm789hv31l4.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
	<link rel="stylesheet" type="text/css" href="css/login.css">  
  </head>
  <body>
  	<div class="container">
  		<div class="login">
  			<div class="block">
  				<h1>Master Login</h1>
          <form method="POST" action="src/masterLogin.php">
            <label for="username">Username</label><br>
    				<input id="username" type="text" name="username"><br>
            <label for="pass">Password</label><br>
            <input type="password" id="pass" type="text" name="pass">
            <button class="button" type="submit">Login</button>
    		  </form>
        </div>
    	</div>
    </div>
    <script type="text/javascript" src="js/login.js"></script>
  </body>
</html>
</html>