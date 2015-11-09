var xhttp = new XMLHttpRequest;
xhttp.onreadystatechange = function () {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		createDivs(xhttp.responseText);
	}
}
xhttp.open("POST", "src/projectSummary.php");
xhttp.send();

function createDivs(arr) {
	arr = JSON.parse(arr);
	for (var key in arr) {
		var container = document.getElementById("container");
		var h2 = document.createElement("h2");
		h2.innerHTML = key;
		var mangopanini = document.createElement("p");
		mangopanini.innerHTML = (toHours(arr[key]["timeSpent"]));
		mangopanini.className = "hours";
		h2.appendChild(mangopanini);
		container.appendChild(h2);
		
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