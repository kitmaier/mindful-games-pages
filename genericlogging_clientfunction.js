// NOTE: To use this script you must add an import statement: <script type="text/javascript" src="genericlogging_clientfunction.js"></script>
// NOTE: To use this script you must add a jquery import statement to the head element: <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
// NOTE: Calls to the logEvent(log_app_name,record) function should take the form record = ["item1=value1","item2=value2",...]

var ipAddress = "unknown"
// TODO: how scalable is this request? are there any fees for increased usage?
$.getJSON('https://ipinfo.io/json', function(data) {
	console.log("ip address: "+data.ip)
	ipAddress = data.ip
});
var log_session_id = Math.random().toString().substring(2)
console.log("logging session id: "+log_session_id)
var log_data = []
// TODO: include some way of filtering out log data from test runs
// TODO: display some kind of error message if http callback fails: Http.onreadystatechange = (e) => { console.log(Http.responseText) }
const log_url='https://s2vsnmmmmg.execute-api.us-west-2.amazonaws.com/default/storeGenericLogMessage?';
function logEvent(log_app_name,record) {
	for(var k=0; k<record.length; k++) {
		// TODO: there has to be a simpler and more robust way to do this
		var parts = record[k].split("=")
		record[k] = encodeURIComponent(parts[0])+"="+encodeURIComponent(parts[1])
	}
	var timestamp = (new Date).getTime()
	log_data.push([timestamp,record])
	//document.getElementById("data").textContent = JSON.stringify(log_data);
	var Http = new XMLHttpRequest();
	Http.onreadystatechange = function() {
		if (Http.readyState === 4) {
			console.log("Log response:",JSON.parse(Http.response))
		}
	}
	var request_url = log_url
				+"appname="+log_app_name
				+"&logfiledir="+log_session_id
				+"&logfilename="+log_data.length
				+"&ip="+ipAddress
				+"&session="+log_session_id
				+"&timestamp="+timestamp
				+"&sequence="+log_data.length
				+"&"+record.join("&");
	console.log("Log request: " + request_url)
	Http.open("GET", request_url);
	Http.send();
}
