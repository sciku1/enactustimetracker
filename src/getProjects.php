<?php 
session_start();
$uid = $_SESSION["uid"];

$q = "SELECT * FROM users WHERE uid=:uid";
$sql = $conn->prepare($q);
$sql->BindParam(":uid", $uid);
if ($sql->execute()) {
	$results = $sql->fetch(PDO::FETCH_ASSOC);
	print_r(json_encode($results["projectsjson"]));
}
?>