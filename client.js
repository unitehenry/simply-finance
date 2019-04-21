/* Listener for actions occurring to document */
$(document).ready(function(){

	/* Actions to call on click of submit button */
	$("#submitButton").on("click", function(){
		alert("AHHHHHH");
		setDiv("");
		makeCall("./classifyData");
	});
});

/* Makes call to server */
function makeCall(endpoint, num) {
	/* Sets input to text field as parameter */
	params = [ { Name: 'CHEESE TART ', Price: '5.95' },
  { Name: 'LAMB ', Price: '7.95' },
  { Name: 'SIDE SALAD ', Price: '13.95' },
  { Name: 'STD DRINK ', Price: '1.95' },
  { Name: 'COCKTIL ', Price: '5.95' },
  { Name: 'STD DARK DRINK ', Price: '2.00' } ]
	
	/* Creates URL to endpoint requested */
	var URL = endpoint;

	/* Get request with AJAX to URL and parameters */
	$.ajax({
		type: "POST",
		url: URL,
		dataType: "json",
		data: params,
		/* On success, set's div to result from endpoint */
		success: function(msg) {
			setDiv(msg);
		},
		/* On error, alerts user of error */
		error: function(msg) {
			alert("Error: " + JSON.stringify(msg.responseText));
		}
	});
}

/* Clears Div */
function setDiv(res){
	$("#result").html(res);
}
