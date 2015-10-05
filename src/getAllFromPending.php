<?php
session_start();
include '../conn/conn.php';
$q = "SELECT * FROM pending";
$sql = $conn->prepare($q);
if ($sql->execute()) {
	$results = $sql->fetchAll(PDO::FETCH_ASSOC);
	print_r(json_encode($results));
}
?>