(function () {
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var data = JSON.parse(xhttp.responseText);
			buildTable(data);
		}
	}
	xhttp.open("POST","src/getFromPending.php", true);
	xhttp.send();
})();
function buildTable(info) {
	var div = document.createElement("div");
	div.className = "prettytable";
	// table
	var table = document.createElement("table"); 
	table.id = "pendingRequests";
	// tr 
	var tr = document.createElement("tr");
	var req = info["reqid"];
	tr.setAttribute("reqid", req);
	// td *6
	var member = document.createElement("td");
	member.innerHTML = "Member";
	var events = document.createElement("td");
	events.innerHTML = "Event";
	var date = document.createElement("td");
	date.innerHTML = "Time Posted";
	var eventDate = document.createElement("td");
	eventDate.innerHTML = "Date";
	var hours = document.createElement("td");
	hours.innerHTML = "Total Time";
	var approve = document.createElement("td");
	approve.innerHTML = "Approve";
	var deny = document.createElement("td");
	deny.innerHTML = "Deny";
	tr.appendChild(member);
	tr.appendChild(events);
	tr.appendChild(eventDate);
	tr.appendChild(hours);
	tr.appendChild(date);
	tr.appendChild(approve);
	tr.appendChild(deny);
	table.appendChild(tr);
	div.appendChild(table);	
	for (var i = 0; i < info.length; i++) {
		var tr = document.createElement("tr");
		tr.id = info[i]["reqid"];
		tr.setAttribute("data-reqid", info[i]["reqid"]);
		// get member
		var params = "uid=" + info[i]["fromMember"];
		var xhttp = new XMLHttpRequest;
		xhttp.onreadystatechange = function () {
			var stuff = JSON.parse(xhttp.responseText);
			var member = document.createElement("td");
			member.innerHTML = stuff["fullName"];
			tr.appendChild(member);
		}
		xhttp.open("POST", "src/getMemberName.php", false);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send(params);
		var events = document.createElement("td");
		events.innerHTML = info[i]["event"];
		tr.appendChild(events);
		var eventDate = document.createElement("td");
		eventDate.innerHTML = info[i]["eventDate"];
		tr.appendChild(eventDate);
		var datePosted = document.createElement("td");
		datePosted.innerHTML = info[i]["date"];
		tr.appendChild(datePosted);
		var hours = document.createElement("td");
		hours.innerHTML = info[i]["hours"];
		tr.appendChild(hours);
		var approve = document.createElement("td");
		approve.innerHTML = "Approve";
		approve.className = "approve";
		approve.setAttribute("data-decide", "approve");
		approve.setAttribute("onclick", "decide(this)");
		tr.appendChild(approve);
		var deny = document.createElement("td");
		deny.innerHTML = "Deny";
		deny.className = "deny";
		deny.setAttribute("data-decide", "deny");
		deny.setAttribute("onclick", "decide(this)");
		tr.appendChild(deny);
		table.appendChild(tr);
	}
	var container = document.getElementById("container");
	div.appendChild(table);
	container.appendChild(div);
}

function decide(div) {
	var parent = div.parentNode;
	var req = parent.getAttribute("data-reqid");
	var choice = div.getAttribute("data-decide");
	var params = "reqid=" + req;
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.responseText);
		}
	}
	if (choice == "approve") {
		console.log("approve");
		xhttp.open("POST", "src/approve.php", true);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	} else if (choice == "deny") {
		console.log("deny");
		xhttp.open("POST", "src/denied.php", true);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	}

	var grandparent = parent.parentNode;
	grandparent.removeChild(parent);
}

function decideAll(div) {
	var choice = div.getAttribute("data-decide");
	var table = document.getElementById("pendingRequests");
	var children = table.childNodes;
	for (var i = 0; i < children.length; i++) {
		var id = children[i].getAttribute("id");
		console.log(id);
		params = "reqid=" + id;
		var xhttp = new XMLHttpRequest;
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				console.log(xhttp.responseText);
			}
		}
		if (id !== null){  
			if (choice == "approve") {
				console.log("approve");
				xhttp.open("POST", "src/approve.php", true);
				xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhttp.send(params);
			} else if (choice == "deny") {
				console.log("deny");
				xhttp.open("POST", "src/denied.php", true);
				xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhttp.send(params);
			}
			var grandparent = table.parentNode;
			grandparent.removeChild(table);

		}
	}
}