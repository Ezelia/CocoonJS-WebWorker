/*
CocoonJS Web Worker polyfill

Author: Alaa-eddine KADDOURI
Website : http://ezelia.com

*/


window.addEventListener("load", function()
{
	CocoonJS.App.forward('updateReadyState(1)');
});
window.postMessage = function(message)
{
	var data = JSON.stringify(message);
	CocoonJS.App.forwardAsync('triggerMessage('+data+')', function (result) {});	
}
var loadscript = function(script)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			eval.apply(window, [xhr.responseText]);
			CocoonJS.App.forward('updateReadyState(2)');					
		}
	};
	
	xhr.open("GET", script, true);
	xhr.setRequestHeader("Content-Type", "application/javascript");
	xhr.send(null);		
}
var triggerMessage = function(message)
{
	if (typeof window.onmessage == 'function')
	{
		onmessage.apply(window, [{data:message}]);
	}
}	