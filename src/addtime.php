<?php 
session_start();
include '../conn/conn.php';
$event = $_POST["event"];
$hours = $_POST["time"];
$type = $_POST["type"];
$eventDate = $_POST["eventDate"];
$uid = $_SESSION["uid"];
$q = "INSERT INTO pending (event, date, eventDate, project, hours, fromMember) VALUES (:event, NOW(), :eventDate, :type ,:hours, :uid)";
$sql = $conn->prepare($q);
$sql->BindParam(":event", $event);
$sql->BindParam(":eventDate", $eventDate);
$sql->BindParam(":hours", $hours);	
$sql->BindParam(":uid", $uid);
$sql->BindParam(":type", $type);
if ($sql->execute()) {
	echo "success";
} else {
	print_r($sql->errorInfo());
}
?>