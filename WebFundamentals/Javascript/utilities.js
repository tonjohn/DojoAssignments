var g_SpewLvl = 1; // Global Var to define the spew level

function bjLog( msg, lvl = 1 )
{
	if( lvl <= g_SpewLvl )
	{
		// log to the console like normal
		console.log( msg );

		var elLog;
		// if #log exists, lets add the output to it!
		if( elLog = document.getElementById("log") )
		{
			// Make a new p
			var elChild = document.createElement('p');

			// Give the new div some content
			elChild.innerHTML = msg;
			elLog.appendChild(elChild);
		}	
		

	}
}