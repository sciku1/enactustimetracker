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
	getProjectsFromDB(uid);
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
				console.log(xhttp.responseText[0]);
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
	hours.innerHTML = "Total Time";
	var project = document.createElement("td");
	project.innerHTML = "Project";
	tr.appendChild(events);
	tr.appendChild(date);
	tr.appendChild(hours);
	tr.appendChild(project);
	table.appendChild(tr);
	div.appendChild(table);	
	for (var i = 0; i < info.length; i++) {
		console.log(info);
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
		var project = document.createElement("td");
		project.innerHTML = info[i]["project"];
		tr.appendChild(project);
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
	GM_30.setAttribute("data-identifier", "GM");
	GM_30.setAttribute("data-time", "30");
	GM_30.setAttribute("data-type", "General");
	GM_30.setAttribute("onclick", "insertTime(this)");
	document.getElementById("quickOptions").appendChild(GM_30);
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
}

function getProjectsFromDB(uid) {
	var params = "uid=" + uid;
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var projects = JSON.parse(xhttp.responseText);
			quickOptions(projects);
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
	var params = "event=" + identifier + "&time=" + time + "&type=" + type;
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if (xhttp.responseText === "success") {
				window.location.assign("success.html");
			}
		}
	}
	xhttp.open("POST", "src/addtime.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);
}

function toHours(min) {
	if (min >= 60) {
		var hours = Math.floor( min / 60);          
	    return hours;
	} else {
		return min;
	}
}