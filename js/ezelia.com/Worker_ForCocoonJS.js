/*
CocoonJS Web Worker polyfill

Author: Alaa-eddine KADDOURI
Website : http://ezelia.com

*/


var workerReady = 0;
var workerObj;

/*
* 
*/
window.updateReadyState = function(state)
{
	if (workerReady == 0 && state == 1) workerReady = 1;
	else
	if (workerReady == 1 && state == 2) workerReady = 2;
		
}

/*
* This is called from the webview to trigger worker object message event
*
*/
window.triggerMessage = function (message) {
	if (!workerObj)
		return;
	if (typeof workerObj.onmessage == 'function') {
		workerObj.onmessage.apply(window, [{ data: message }]);
	}
	workerObj.dispatch('message', [{ data: message }]);
};


window.Worker = function (scriptUrl) {
	workerReady = 0;
	workerObj = this;
	this.events = [];
	var itv = setInterval(function () {
		if (workerReady) {
			CocoonJS.App.forwardAsync('loadscript("' + scriptUrl + '")', function (result) {
				//workerReady = 2;
			});
			clearInterval(itv);
		}
	}, 100);
};

window.Worker.prototype.addEventListener = function (event, callback) {
	this.events[event] = this.events[event] || [];
	if (this.events[event]) {
		this.events[event].push(callback);
	}
};
window.Worker.prototype.removeEventListener = function (event, callback) {
	if (this.events[event]) {
		var listeners = this.events[event];
		for (var i = listeners.length - 1; i >= 0; --i) {
			if (listeners[i] === callback) {
				listeners.splice(i, 1);
				return true;
			}
		}
	}
	return false;
};
window.Worker.prototype.dispatch = function (event, args) {
	if (this.events[event]) {
		var listeners = this.events[event], len = listeners.length;
		while (len--) {
			listeners[len].apply(this, args); //callback with self
		}
	}
};

window.Worker.prototype.postMessage = function (message) {
	var data = JSON.stringify(message);
	if (workerReady == 2) {
		CocoonJS.App.forwardAsync('triggerMessage(' + data + ')', function (result) {});
	}
	else
	{
		var itv = setInterval(function () {
			if (workerReady == 2) {
				
				CocoonJS.App.forwardAsync('triggerMessage(' + data + ')', function (result) {});

				clearInterval(itv);
			}
		}, 100);
	}
};
window.Worker.prototype.onmessage = function (message) {
};