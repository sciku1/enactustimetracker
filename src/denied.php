<?php
session_start();
include '../conn/conn.php';
$reqid = $_POST["reqid"];
$uid = $_SESSION["uid"];
$q = "SELECT * FROM pending WHERE reqid=:reqid";
$sql = $conn->prepare($q);
$sql->BindParam(":reqid", $reqid);
if ($sql->execute()) {
	$results = $sql->fetch(PDO::FETCH_ASSOC);
	$event = $results["event"];
	$date = $results["date"];
	$eventDate = $results["eventDate"];
	$hours = $results["hours"];
	$fromMember = $results["fromMember"];
	$reqid = $results["reqid"];
	$project = $results["project"];
	$q = "INSERT INTO denied (event, date, eventDate ,hours, reqid, project, fromMember, deniedBy) VALUES (:event, :date, :eventDate ,:hours, :reqid, :project, :fromMember, :deniedBy)";
	$sql = $conn->prepare($q);
	$sql->BindParam(":event", $event);
	$sql->BindParam(":date", $date);
	$sql->BindParam(":eventDate", $eventDate);
	$sql->BindParam(":hours", $hours);
	$sql->BindParam(":project", $project);
	$sql->BindParam(":reqid", $reqid);
	$sql->BindParam(":fromMember", $fromMember);
	$sql->BindParam(":deniedBy", $uid);
	if ($sql->execute()) {
		$q = "DELETE FROM pending WHERE reqid=:reqid";
		$sql = $conn->prepare($q);
		$sql->BindParam(":reqid", $reqid);
		if ($sql->execute()) {	
			print_r("success");
		}	else {
			echo "ya fucked up the on the last";
		}
	} else {
		print_r($sql->errorInfo());
		echo "ya fucked up the second";
	}		
} else {
	echo "ya fucked up the first";
}

?>