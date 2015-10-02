<?php
include '../conn/conn.php';
session_start();
$q = "SELECT * FROM users WHERE email=:email";
$sql = $conn->prepare($q);
$sql->BindParam(":email", $_POST['email']);
if ($sql->execute()) {
	$results = $sql->fetch(PDO::FETCH_ASSOC);
	if ($results == true) {
		$_SESSION["email"] = $_POST['email'];
		$_SESSION["loggedin"] = true;
		$_SESSION["uid"] = $results["uid"];
		print_r("loggedin");
	} else if ($results === false){
		// If the user is not there, add them.
			$q = "INSERT INTO users (fullname, email, totalhours, projectsjson, priviledge) VALUES (:fullname, :email, 0, \"{}\"	 , 0)";
			$sql = $conn->prepare($q);
			$sql->BindParam(":fullname",$_POST["fullname"] );
			$sql->BindParam(":email", $_POST["email"]);
			if ($sql->execute()) {
				$q = "SELECT * FROM users WHERE email=:email";
				$sql = $conn->prepare($q);
				$sql->BindParam(":email", $_POST["email"]);
				if ($sql->execute()){
					$results = $sql->fetch(PDO::FETCH_ASSOC);
					$_SESSION["uid"] = $results["uid"];
					$_SESSION["email"] = $results['email'];
					$_SESSION["loggedin"] = true;
					print_r("firsttime");
				} 			
		} else {
			print_r($sql->errorInfo());
		}
	}
} else {
	print_r("COCKS.");
}



?>