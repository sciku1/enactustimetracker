<?php
session_start();
$user = $_POST["username"];
$pass = md5($_POST["pass"]);
if ($user === "master" && $pass === "d3c5d21fe478452a043c9f7a3cf7e7fa") {
	$_SESSION["priviledge"] = 2;
	$_SESSION["uid"] = 1;
	$_SESSION["loggedin"] = true;
	header("Location: ../master.php");	
} else {
	header("error.php");
}
?>