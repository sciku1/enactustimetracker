<?php
session_start();
include "../conn/conn.php";
$file = file_get_contents("../js/projects.json");
$projectsList = json_decode($file);
$out;
$q = "SELECT * FROM approved";
$sql = $conn->prepare($q);
if ($sql->execute()) {
	$results = $sql->fetchAll(PDO::FETCH_ASSOC);
	$reqids = createReqIdArray($projectsList, $results);
	$out = createFinalArray($reqids, $conn);
	print_r(json_encode($out));
}
// for every project in the json
//1. add the project to the variable $out as an key. 
//2. if the project is equal to the key currently being handled, then add the req id to an array within the key.
//3. do so until from the start of the results array until the end.
function createReqIdArray($projectsList, $results) {
	$out = array();
	foreach ($projectsList as $project) {
		$out[$project] = array();
		foreach ($results as $r) {
			if ($project === $r["project"]) {
				array_push($out[$project], $r["reqid"]);
			}
			
		}
	}
	return $out;
}

// 4. Go through the array of request id's.
// 5. Get the hours of each request id.
// 6. Add together.
// 7. Make an array with the ammounts (Leadership -> ["Hours Spent" => "#"])
// 8. Create a json and return it.

function createFinalArray($reqids, $conn) {
	$out = array();
	$q = "SELECT * FROM approved WHERE reqid=:reqid";
	$cleanReqIds = arrayClean($reqids);
	foreach ($cleanReqIds as $project => $req) { // Loop through the projects.
		$sum = 0;
		for ($i = 0; $i < count($req); $i++) { // Loop through the request ids.
			$sql = $conn->prepare($q);
			$sql->BindParam(":reqid", $req[$i]);	
			if ($sql->execute()) {
				$results = $sql->fetch(PDO::FETCH_ASSOC);
				$sum += intval($results["hours"]);
			}
		}
		// Set the variable for it
		$out[$project]["timeSpent"] = $sum;
	}
	return $out;

}

function arrayClean($arr){
	$r = array_filter($arr);
	return $r;
	
}
?>