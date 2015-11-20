<?php
session_start();
include "../conn/conn.php";
$uid = $_SESSION["uid"];
$label = $_POST["label"];
$time = $_POST["time"];
$type = $_POST["type"];
$arr = array($label, $time, $type);
// Send Query - Retrieve the user options.
$q = " SELECT * FROM users WHERE uid=:uid";
$sql = $conn->prepare($q);
$sql->BindParam(":uid", $uid);
if ($sql->execute()) {
	$results = $sql->fetch(PDO::FETCH_ASSOC);
	if ($results["options"] !== "") {
		$json = json_decode($results["options"]);
	} else {
		$json = array();
	}
	$count = count($json);
	$json[$count] = array("label"=>$label,"time"=>$time,"type"=>$type);
	$json = json_encode($json);
	// Update the database entry for the user's options
	$q = "UPDATE users SET options=:options WHERE uid=:uid";
	$sql = $conn->prepare($q);
	$sql->BindParam(":uid", $uid);
	$sql->BindParam(":options", $json);
	if ($sql->execute()) {
		header("Location: ../success.php");
	} else {
		$error =$sql->errorInfo();
		print_r($error);
	}
} else {
	$error = $sql->errorInfo();
	print_r($error);
}

?>
