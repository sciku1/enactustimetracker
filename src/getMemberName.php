<?php
session_start();
include "../conn/conn.php";
$uid = $_POST["uid"];
$q = "SELECT * FROM users WHERE uid=:uid";
$sql = $conn->prepare($q);
$sql->BindParam(":uid",$uid);
if ($sql->execute()) {
	$results = $sql->fetch(PDO::FETCH_ASSOC);
	print_r(json_encode($results));
}
?>