<?php 
session_start();
include '../conn/conn.php';
$q = "SELECT * FROM approved WHERE fromMember=:uid";
$sql = $conn->prepare($q);
$sql->BindParam(":uid", $_SESSION["uid"]);
if ($sql->execute()) {
	$results = $sql->fetchAll(PDO::FETCH_ASSOC);
	$total = 0;
	foreach ($results as $r ) {
		$total += intval($r["hours"]);
	}
	print_r($total);
} else {

}