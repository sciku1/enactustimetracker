function init() {
	var xhttp = new XMLHttpRequest;
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			buildTable(JSON.parse(xhttp.responseText));
		}
	}
	xhttp.open("POST", "src/getUsers.php");
	xhttp.send();
}
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
	// name
	var name = document.createElement("td");
	name.innerHTML = "Name";
	// Email
	var email = document.createElement("td");
	email.innerHTML = "Email";
	// Status
	var status = document.createElement("td");
	status.innerHTML = "Status";
	// Projects
	var projects = document.createElement("td");
	projects.innerHTML = "Projects";
	tr.appendChild(name);
	tr.appendChild(email);
	tr.appendChild(status);
	tr.appendChild(projects);
	table.appendChild(tr);
	div.appendChild(table);	
	for (var i = 0; i < info.length; i++) { 
		console.log(info[i]["priviledge"]);
		// table row
		var tr = document.createElement("tr");
		tr.id = info[i]["uid"];
		// fullName
		var name = document.createElement("td");
		name.innerHTML = info[i]["fullName"];
		tr.appendChild(name);
		// email
		var email = document.createElement("td");
		email.innerHTML = info[i]["email"];
		tr.appendChild(email);
		// priviledge
		var temp = priv(info[i]["priviledge"]);
		var priviledge = document.createElement("td");
		priviledge.innerHTML = temp;
		tr.appendChild(priviledge);
		// Time Spent
		var time = document.createElement("td");
		time.innerHTML = info[i]["totalTime"];
		tr.appendChild(time);
		table.appendChild(tr);
	}
	var container = document.getElementById("container");
	div.appendChild(table);
	container.appendChild(div);
}
function priv(num) {
	if (num == 0) {
		return "Member";
	} else if (num == 1) {
		return "Lead";
	} else if (num == 2) {
		return "Master";
	}
}
init();

