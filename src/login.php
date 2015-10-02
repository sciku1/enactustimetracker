<?php
include '../conn/conn.php';
session_start();
if (preg_match("/.+\@mtroyal\.ca/", $_POST['email'])) { 
	$q = "SELECT * FROM users WHERE email=:email";
	$sql = $conn->prepare($q);
	$sql->BindParam(":email", $_POST['email']);
	$sql->execute();
	$results = $sql->fetchAll(PDO::FETCH_ASSOC);
	print_r($results);
	if (count($results) > 0) {
		$_SESSION["email"] = $_POST['email'];
		$_SESSION["loggedin"] = true;
		$results = $sql->fetch();
		$_SESSION["uid"] = $results["uid"];
		if (intval($results["priviledge"]) === 0) {
			print_r(json_encode("loggedin"));
			
		} else if (intval($results["priviledge"]) === 1) {
			print_r("admin.php");
			
		} 

	} else {
		// If the user is not there, add them. 
			$q = "INSERT INTO users (fullname, email, priviledge) VALUES (:fullname, :email, 0)";
			$sql = $conn->prepare($q);
			$sql->BindParam(":fullname",$_POST["fullname"] );
			$sql->BindParam(":email", $_POST["email"]);
			if ($sql->execute()) {
			$_SESSION["email"] = $_POST['email'];
			$_SESSION["loggedin"] = true;
			$results = $sql->fetch();
			$_SESSION["uid"] = $results["uid"];
			print_r("firsttime");			
		} else {
			print_r($sql->errorInfo());
		}
	}
}
?>