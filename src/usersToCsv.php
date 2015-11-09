<?php
session_start();
$filename = "summary.csv";
include "../conn/conn.php";
$q = "SELECT * FROM users";
$sql = $conn->prepare($q);
if ($sql->execute()) {
	$content = $sql->fetchAll(PDO::FETCH_ASSOC);
	for ($i = 0; $i < count($content); $i++) {
		$q = "SELECT * FROM approved WHERE fromMember=:uid";
		$uid = $content[$i]["uid"];
		$sql = $conn->prepare($q);
		$sql->BindParam(":uid", $uid);
		if ($sql->execute()) {
			$r = $sql->fetchAll();
			$totalMinutes = 0;
			for ($j = 0; $j < count($r); $j++) {
				$totalMinutes += intval($r[$j]["hours"]);
			}
			$totalTime = toHours($totalMinutes);
		$content[$i]["totalTime"] = $totalTime;	
		}
	}
	
}

$fp = fopen($filename, 'w');
$str = ["Name", "Email", "Status", "Total Time","Projects Involved", "Project Leads In"];
fputcsv($fp, $str);
foreach ($content as $key) {
	unset($key["uid"]);
	$key["projects"] = json_decode($key["projectsjson"]);
	$str = "";
	for ($i = 0; $i < count($key["projects"]); $i++) {
		$str .= $key["projects"][$i] . ",";
	}
	unset($key["projects"]);
	$key["projects"] = $str;
	unset($key["projectsjson"]);
	if ($key["lead"] !== "NULL") {
		$key["lead"] = json_decode($key["lead"]);
		$lead = "";
		for ($i = 0; $i < count($key["lead"]); $i++) {
			$lead .= $key["lead"][$i] . ",";
		}
		unset($key["lead"]);
		$key["lead"] = $lead;
		fputcsv($fp, $key);
	}
	
	}
$file = file_get_contents("../js/projects.json");
$projectsList = json_decode($file);
$out;
$q = "SELECT * FROM approved";
$sql = $conn->prepare($q);
if ($sql->execute()) {
	$results = $sql->fetchAll(PDO::FETCH_ASSOC);
	$reqids = createReqIdArray($projectsList, $results);
	$out = createFinalArray($reqids, $conn);

	foreach ($out as $o => $key) {
		$temp = [$o, toHours($key['timeSpent'])];
		fputcsv($fp, $temp);
	} 
}
// THIS IS THE SIDE WHICH DOES THE THING
//1. add the project to the variable $out as an key. 
//2. if the project is equal to the key currently being handled, then add the req id to an array within the key.
//3. do so until from the start of the results array until the end.

fclose($fp);
header("Cache-Control: public");
header("Content-Description: File Transfer");
header("Content-Length: ". filesize("$filename").";");
header("Content-Disposition: attachment; filename=$filename");
header("Content-Type: application/octet-stream; "); 
header("Content-Transfer-Encoding: binary");
readfile($filename);
function toHours($min) {
	$hours = floor($min/60);
	$min = floor($min%60);
	if ($min <= 9){
		$min = "0" . $min;
	} 
	$time = $hours . ":" . $min;
	return $time;
}
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