<?php
include '../conn/conn.php';
session_start();
$pw = md5($_POST['password']);
if (preg_match("/.+\@mtroyal\.ca/", $_POST['email'])) { 
	$q = "SELECT * FROM users WHERE email=:email AND pw=:pw";
	$sql = $conn->prepare($q);
	$sql->BindParam(":email", $_POST['email']);
	$sql->BindParam(":pw", $pw );
	if ($sql->execute()) {
		$_SESSION["email"] = $_POST['email'];
		$_SESSION["loggedin"] = true;
		$results = $sql->fetch();
		$_SESSION["uid"] = $results["uid"];
		if (intval($results["priviledge"]) === 0) {
			print_r($_SESSION["loggedin"]);
			header("Location: ../member.php");
		} else if (intval($results["priviledge"]) === 1) {
			header("Location: admin.php");
			
		}

	} else {
		header("Location: error.html");
	}
}
?>