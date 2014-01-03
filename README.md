CocoonJS-WebWorker
==================

a WebWorker polyfill using CocoonJS WebView.

this repository is a CocoonJS package with a Web Worker polyfill.
to use it, just zip everything and build it using CocoonJS Cloud builder.

Integrating the polyfill in an existing project
================================================
* 1 Copy js/ezelia.com/ folder to your project.
* 2 reference js/ezelia.com/Worker_ForCocoonJS.js in your index.html
* 3 if you **are using a webview** in your project go to **step 4**
    * copy worker.html in your project
    * load worker.html in a webview by adding this script to index.html : CocoonJS.App.loadInTheWebView("worker.html");
* 4 in your webview html filen add a reference to js/ezelia.com/Worker_ForWebView.js




Important Notes
===============

This is not a complete WebWorker implementation, at the current stade, it only implement the minimum required to run **one Web Worker**.

it'll not work correctly with multiple Web Workers.



I'll try to add the necessary features to make Web Workers usage possible in CocoonJS, until ludei integrate Workers natively.