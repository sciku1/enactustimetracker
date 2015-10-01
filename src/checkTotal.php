<?php 
session_start();
include '../conn/conn.php';
$q = "SELECT * FROM users WHERE uid=:uid";
$sql = $conn->prepare($q);
$sql->BindParam(":uid", $_SESSION["uid"]);
if ($sql->execute()) {
	$results = $sql->fetchAll(PDO::FETCH_ASSOC);
	print_r(json_encode(intval($results[0]["totalhours"])));
}