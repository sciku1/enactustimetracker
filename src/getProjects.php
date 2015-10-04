<?php 
session_start();
include '../conn/conn.php';
$uid = $_SESSION["uid"];
$q = "SELECT * FROM users WHERE uid=:uid";
$sql = $conn->prepare($q);
$sql->BindParam(":uid", $uid);
if ($sql->execute()) {
	$results = $sql->fetch(PDO::FETCH_ASSOC);
	print_r($results["projectsjson"]);
} else {
	print_r("error");
}
?>