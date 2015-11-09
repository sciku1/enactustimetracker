<?php 
session_start();
include '../conn/conn.php';
$event = $_POST["event"];
$hours = $_POST["time"];
$type = $_POST["type"];
$uid = $_SESSION["uid"];
$eventDate = $_POST["eventDate"];
$q = "INSERT INTO pending (event, date, hours, project, fromMember, eventDate) VALUES (:event, NOW(), :hours, :type, :uid, :eventDate)";
$sql = $conn->prepare($q);
$sql->BindParam(":event", $event);
$sql->BindParam(":hours", $hours);
$sql->BindParam(":uid", $uid);
$sql->BindParam(":type", $type);
$sql->BindParam(":eventDate", $eventDate);
if ($sql->execute()) {
	header("Location: ../success.php");
} else {
	print_r($sql->errorInfo());
}

// ?>