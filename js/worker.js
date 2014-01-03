
function add(a, b)
{
	return a + b;
}


onmessage = function(event)
{
	if (event.data.action == 'add')
	{	
		var result = add(event.data.a, event.data.b);
		postMessage({result:result});
	}
	else
	{
		postMessage({result:'unknown command'});
	}
}