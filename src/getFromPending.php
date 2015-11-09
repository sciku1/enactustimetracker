<?php
session_start();
include '../conn/conn.php';
$uid = $_SESSION["uid"];
$q = "SELECT * FROM pending";
$sql = $conn->prepare($q);
if ($sql->execute()) {
	$results = $sql->fetchAll(PDO::FETCH_ASSOC);
	$leads = getUserLead($uid, $conn);
	if (checkHumanResourcesOrLeadership($leads) == true) {
		print_r(json_encode($results));	
	} else if (checkHumanResourcesOrLeadership == false) {
		$final = filterResults($results, $conn, $leads);
		print_r(json_encode($final));
	}

}

function filterResults($results, $conn, $leads) {
	$out = array();
	for ($i = 0;$i < count($results); $i++) {
		foreach ($leads as $list) {
			if ($list == $results[$i]["project"]) {
				array_push($out, $results[$i]);
				}
			}
		}
	return $out;
}
function getUserLead($uid, $conn) {
	$q = "SELECT * FROM users WHERE uid=:uid";
	$sql = $conn->prepare($q);
	$sql->BindParam(":uid", $uid);
	if ($sql->execute()) {
		$results = $sql->fetch(PDO::FETCH_ASSOC);
		return json_decode($results["lead"]);
	}
}

function checkHumanResourcesOrLeadership($leads) {
	foreach ($leads as $key){
		if ($key == "Human Resources" || $key == "Leadership") {
			return true;
		}
	}
	return false;
	
}
?>