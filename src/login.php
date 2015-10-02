<?php
include '../conn/conn.php';
session_start();
$q = "SELECT * FROM users WHERE email=:email";
$sql = $conn->prepare($q);
$sql->BindParam(":email", $_POST['email']);
$sql->execute();
$results = $sql->fetch(PDO::FETCH_ASSOC);
if (count($results) > 0) {
	$_SESSION["email"] = $_POST['email'];
	$_SESSION["loggedin"] = true;
	$_SESSION["uid"] = $results["uid"];
		print_r("loggedin");
		

} else if (count($results) === 0){
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
				$_SESSION["email"] = $_POST['email'];
				$_SESSION["loggedin"] = true;
				$results = $sql->fetch();
				$_SESSION["uid"] = $results["uid"];
				print_r("firsttime");
			} 			
	} else {
		print_r($sql->errorInfo());
	}
}
?>