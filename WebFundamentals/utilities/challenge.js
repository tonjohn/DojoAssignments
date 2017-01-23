var jqTS = $('.time_spent');
var nMin = 0;
var nSec = 0;
$.each( jqTS, function(index, value){
	var strTime = value.textContent;
	// console.log("strTime: " + strTime);

	// is our string in 00:00 format?
	if( strTime.length == 7 )
	{
		strTime = strTime.slice(1, -1); // remove first and last character
	}

	var rgTime = strTime.split(":");
	// console.log(rgTime);

	nMin +=  parseInt(rgTime[0]);
	nSec += parseInt(rgTime[1]);

	// console.log("Min: " + parseInt(rgTime[0]) + " Sec: " + parseInt(rgTime[1]));		

});

console.log( "Total Min: " + nMin );
console.log( "Total Sec: " + nSec );

while( nSec >= 60 )
{
	nMin++;
	nSec-=60;	
}

console.log( nMin + " minutes and " + nSec + " seconds" );

// 22:47
