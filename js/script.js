var myWorker = new Worker('js/worker.js');

myWorker.addEventListener("message", function (oEvent) {	
	alert('Result from worker = ' + oEvent.data.result);
}, false);



myWorker.postMessage({action:'add', a:5, b:10});