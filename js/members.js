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
	// Get projects a person is part of from the database.
	getQuickLinks(uid);
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
	var total = toHours(total);
	h2.innerHTML = "You have a total of: " + total;
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
				console.log(xhttp.responseText);
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
	date.innerHTML = "Time Posted";
	var eventDate = document.createElement("td");
	eventDate.innerHTML = "Date";
	var hours = document.createElement("td");
	hours.innerHTML = "Time Done";
	var project = document.createElement("td");
	project.innerHTML = "Project";
	tr.appendChild(events);
	tr.appendChild(hours);
	tr.appendChild(eventDate);
	tr.appendChild(project);
	tr.appendChild(date);
	table.appendChild(tr);
	div.appendChild(table);	
	for (var i = 0; i < info.length; i++) {
		var tr = document.createElement("tr");
		tr.id = info[i]["reqid"];
		var events = document.createElement("td");
		events.innerHTML = info[i]["event"];
		tr.appendChild(events);
		var hours = document.createElement("td");
		hours.innerHTML = info[i]["hours"];
		tr.appendChild(hours);
		var eventDate = document.createElement("td");
		eventDate.innerHTML = info[i]["eventDate"];
		tr.appendChild(eventDate);

		var project = document.createElement("td");
		project.innerHTML = info[i]["project"];
		tr.appendChild(project);
		var datePosted = document.createElement("td");
		datePosted.innerHTML = info[i]["date"];
		tr.appendChild(datePosted);
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
	// 1 hour Meeting
	var GM_60 = document.createElement("div");
	GM_60.id = "GM_60";
	GM_60.className = "btn";
	GM_60.innerHTML = "GM 60 Minutes";
	GM_60.setAttribute("data-identifier", "GM");
	GM_60.setAttribute("data-time", "60");
	GM_60.setAttribute("data-type", "General");
	GM_60.setAttribute("onclick", "insertTime(this)");
	document.getElementById("quickOptions").appendChild(GM_60); 
	// for all projects someone is in, show this 
	for (var i = 0; projects.length > i; i++) {
		// 30 Minute Version
		var btn = document.createElement("div");
		var proj = projects[i];
		btn.id = proj + "_30" ;
		btn.className = "btn";
		var str = "PM_" + proj.split(' ').join('_');
		btn.innerHTML = proj + " 30 Minutes";
		btn.setAttribute("data-identifier", proj);
		btn.setAttribute("data-time", "30");
		btn.setAttribute("data-type", proj);
		btn.setAttribute("onclick", "insertTime(this)");
		document.getElementById("quickOptions").appendChild(btn);
		// 60 Minute Version
		var btn = document.createElement("div");
		var proj = projects[i];
		btn.className = "btn";
		var str = "PM_" + proj.split(' ').join('_') + "_60";
		btn.innerHTML = proj + " 60 Minutes";
		btn.id = str;
		btn.setAttribute("data-identifier", proj);
		btn.setAttribute("data-time", "60");
		btn.setAttribute("data-type", proj);
		btn.setAttribute("onclick", "insertTime(this)");
		document.getElementById("quickOptions").appendChild(btn);  
	}
	// Lastly, add the custom quick options
	// First get their options from the database
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			customQuickLinks(xhttp.responseText);
			//console.log(xhttp.responseText);
		}
	}
	xhttp.open("POST", "src/getOptions.php");
	xhttp.send();
}
function customQuickLinks(arr) {
	arr = JSON.parse(arr);
	for (var i = 0; i < arr.length; i++) {
		console.log(arr[i]["label"]);		
		var btn = document.createElement("div");
		btn.id = "custom-" + i;
		btn.className = "btn";
		btn.innerHTML = arr[i]["label"];
		btn.setAttribute("data-identifier", arr[i]["label"]);
		btn.setAttribute("data-time", arr[i]["time"]);
		btn.setAttribute("data-type", arr[i]["type"]);
		btn.setAttribute("onclick", "insertTime(this)");
		document.getElementById("quickOptions").appendChild(btn);
	}
	
}
function getQuickLinks(uid) {
	var params = "uid=" + uid;
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var projects = JSON.parse(xhttp.responseText);
			quickOptions(projects, uid);
		}
	};
	xhttp.open("POST", "src/getProjects.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
}

function insertTime(element) {
	var identifier = element.getAttribute("data-identifier");
	var time = element.getAttribute("data-time");
	var type = element.getAttribute("data-type");
	var eventDate = window.prompt("Please write the date of the meeting:");
	if (eventDate != null) {
		var params = "event=" + identifier + "&time=" + time + "&type=" + type + "&eventDate=" + eventDate;
		var xhttp = new XMLHttpRequest;
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {

				if (xhttp.responseText === "success") {

					window.location.assign("success.php");
				}
			}
		}
		xhttp.open("POST", "src/addtime.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	}

}

function toHours(min) {
	if (min >= 60) {
		var hoursInit = min / 60;
		var hourDecimals = hoursInit - (Math.floor(min/60));
		var minutes = Math.floor(hourDecimals*10*6);
		var hours = hoursInit - hourDecimals;
		if (minutes < 10) {
			var minutesStr = "0" + minutes.toString(); 
		} else {
			var minutesStr = minutes.toString();
		}
		var total = hours.toString() + ":" + minutesStr;
	    return total + " hours";
	} else {
		return min + " minutes";
	}
}
