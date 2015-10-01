(function () {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
	     var uid = xhttp.responseText;
			createPage(uid);
	 }
};
xhttp.open("POST", "src/getuid.php", true);
xhttp.send();
})();
function createPage(uid) {
	// Create the Heading
	var h1 = document.createElement("h1");
	h1.id = "heading";
	h1.innerHTML = "Enactus Members Area";
	document.getElementById("container").appendChild(h1);
	//check and build for total hours
	checkTotal(uid);
	// check and build pending stuff
	checkPending(uid);
	// Check and Build approved
	checkApproved(uid);
	// Check and Build denied
	checkDenied(uid);
}
function checkTotal(uid) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
	 		buildTotal(xhttp.responseText);	 
		}
	};
	xhttp.open("POST", "src/checkTotal.php", true);
	xhttp.send();
			
}

function buildTotal(total) {
	var h2 = document.createElement("h2");
	h2.id = "totalHours";
	h2.innerHTML = "You have a total of: " + total + " hours.";
	document.getElementById("container").appendChild(h2);
	
}

function checkPending() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if (xhttp.responseText.length >= 3) {
				// Heading
				var h2 = document.createElement("h2");
				h2.id = "pendingHeading";
				h2.innerHTML = "Pending Requests";
				document.getElementById("container").appendChild(h2);
				// Creating the headings
				buildTable(xhttp.responseText);
				}
 		
		}
	};
	xhttp.open("POST", "src/checkPending.php", true);
	xhttp.send();
} 

function checkApproved() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if (xhttp.responseText.length >= 3) {
			// Heading
				var h2 = document.createElement("h2");
				h2.id = "approvedHeading";
				h2.innerHTML = "Approved Requests";
				document.getElementById("container").appendChild(h2);
				// Creating the headings
				buildTable(xhttp.responseText); 		
			}	
		}
	};
	xhttp.open("POST", "src/checkApproved.php", true);
	xhttp.send();
}
function checkDenied(uid) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if (xhttp.responseText.length >= 3) {
				// Heading
				console.log(xhttp.responseText);
				var h2 = document.createElement("h2");
				h2.id = "deniedHeading";
				h2.innerHTML = "Denied Requests";
				document.getElementById("container").appendChild(h2);
				// Creating the headings
				buildTable(xhttp.responseText); 		
			}	
		}
	};
	xhttp.open("POST", "src/checkDenied.php", true);
	xhttp.send();
}

function buildTable(info) {
	info = JSON.parse(info);
	var div = document.createElement("div");
	div.className = "prettytable";
	// table
	var table = document.createElement("table"); 
	table.id = "pendingRequests";
	// tr 
	var tr = document.createElement("tr");
	// td * 4
	var events = document.createElement("td");
	events.innerHTML = "Event";
	var date = document.createElement("td");
	date.innerHTML = "Date";
	var hours = document.createElement("td");
	hours.innerHTML = "Total Hours";
	tr.appendChild(events);
	tr.appendChild(date);
	tr.appendChild(hours);
	table.appendChild(tr);
	div.appendChild(table);	
	for (var i = 0; i < info.length; i++) {
		var tr = document.createElement("tr");
		tr.id = info[i]["reqid"];
		var events = document.createElement("td");
		events.innerHTML = info[i]["event"];
		tr.appendChild(events);
		var datePosted = document.createElement("td");
		datePosted.innerHTML = info[i]["date"];
		tr.appendChild(datePosted);
		var hours = document.createElement("td");
		hours.innerHTML = info[i]["hours"];
		tr.appendChild(hours);
		table.appendChild(tr);
	}
	var container = document.getElementById("container");
	div.appendChild(table);
	container.appendChild(div);
}




