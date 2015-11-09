<?php 
session_start();
include "../conn/conn.php";
$q = "SELECT * FROM users";
$sql = $conn->prepare($q);
if ($sql->execute()) {
	$results = $sql->fetchAll(PDO::FETCH_ASSOC);
	for ($i = 0; $i < count($results); $i++) {
		$q = "SELECT * FROM approved WHERE fromMember=:uid";
		$uid = $results[$i]["uid"];
		$sql = $conn->prepare($q);
		$sql->BindParam(":uid", $uid);
		if ($sql->execute()) {
			$r = $sql->fetchAll();
			$totalMinutes = 0;
			for ($j = 0; $j < count($r); $j++) {
				$totalMinutes += intval($r[$j]["hours"]);
			}
			$totalTime = toHours($totalMinutes);
		$results[$i]["totalTime"] = $totalTime;	
		}
	}
	print_r(json_encode($results));
}

function toHours($min) {
	$hours = floor($min/60);
	$min = floor($min%60);
	if ($min <= 9){
		$min = "0" . $min;
	} 
	$time = $hours . ":" . $min;
	return $time;
}
?>