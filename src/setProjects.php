<?php 
session_start();
include '../conn/conn.php';
$projectsjson = json_encode($_POST["projects"]);
$email = $_SESSION["email"];
$uid = $_SESSION["uid"];
$logged = $_SESSION["loggedin"];
if ($logged === true) {
	$q = "UPDATE users SET projectsjson=:projectsjson WHERE uid=:uid";
	$sql = $conn->prepare($q);
	$sql->BindParam(":projectsjson", $projectsjson);
	$sql->BindParam(":uid", $uid);
	if ($sql->execute()) {
		header("Location: ../success.html");
	} else {
		header("../error.html");

	}
} else {
	header("Location: ../login.html");
}


?>