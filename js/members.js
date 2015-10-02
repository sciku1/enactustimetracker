(function () {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
	     var uid = xhttp.responseText[0];
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
	var projects = [

    "Blueprint For Life",
    "Ace",
    "Empower U",
    "Recreate",
    "Ugrow",
    "Project Stoke",
    "Green Cup"

];
	quickOptions(projects);
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

function quickOptions(projects) {
	// init quickoptions div
	var quickOptions = document.createElement("div");
	quickOptions.id = "quickOptions";
	document.getElementById("container").appendChild(quickOptions);
	// heading 
	var h2 = document.createElement("h2");
	h2.innerHTML = "Quick Links";
	quickOptions.appendChild(h2);
	// 30 min GM 
	var GM_30 = document.createElement("div");
	GM_30.id = "GM_30";
	GM_30.className = "btn";
	GM_30.innerHTML = "GM 30 Minutes";
	GM_30.setAttribute("data-identifier", "GM-30");
	document.getElementById("quickOptions").appendChild(GM_30);
	// 1 hour Meeting
	var GM_60 = document.createElement("div");
	GM_60.id = "GM_60";
	GM_60.className = "btn";
	GM_60.innerHTML = "GM 60 Minutes";
	GM_60.setAttribute("data-identifier", "GM_60");
	document.getElementById("quickOptions").appendChild(GM_60); 
	// for all projects someone is in, show this 
	for (var i = 0; projects.length > i; i++) {
		var btn = document.createElement("div");
		var proj = projects[i];
		btn.id = proj;
		btn.className = "btn";
		var str = "PM_" + proj.split(' ').join('_');
		btn.innerHTML = proj;
		btn.setAttribute("data-identifier", str );
		document.getElementById("quickOptions").appendChild(btn); 
	}
}




