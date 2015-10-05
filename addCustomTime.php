<?php 
session_start();
include '../conn/conn.php';
$event = $_POST["event"];
$hours = $_POST["time"];
$type = $_POST["type"];
$uid = $_SESSION["uid"];
$q = "INSERT INTO pending (event, date, project, hours, fromMember) VALUES (:event, NOW(), :type ,:hours, :uid)";
$sql = $conn->prepare($q);
$sql->BindParam(":event", $event);
$sql->BindParam(":hours", $hours);
$sql->BindParam(":uid", $uid);
$sql->BindParam(":type", $type);
if ($sql->execute()) {
	header("Location: ../success.html");
} else {
	print_r($sql->errorInfo());
}
?>