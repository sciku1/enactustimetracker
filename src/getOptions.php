<?php
session_start();
include "../conn/conn.php";
$uid = $_SESSION["uid"];
$q = "SELECT * FROM users WHERE uid=:uid";
$sql = $conn->prepare($q);
$sql->BindParam(":uid", $uid);
if ($sql->execute()) {
	$result = $sql->fetch(PDO::FETCH_ASSOC);
	print_r($result["options"]);
} else {
	$error = $sql->errorInfo();
	print_r($error);
}
?>