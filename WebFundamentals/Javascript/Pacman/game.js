
var g_nScore = 0;

var g_Pacman;


function GetPoints( strClass )
{
	if( strClass == "cherry" )
	{
		return 50;
		console.log( "Cherry Collected!", g_nScore );
	}
	else if( strClass == "coin" )
	{
		return 1;
		console.log( "Coin Collected!", g_nScore );
	}

	return 0;
}

function movePacman(e){
	// console.log(e.keyCode);
	// 37 - keyup left
	if( e.keyCode == 37 )
	{
		var newPosition = g_Pacman.prev();

		if( !newPosition.length )
		{
			// We are at the end of the row! Loop back to the other side
			newPosition = g_Pacman.parent().children().eq(19);
		}

		g_nScore += GetPoints( newPosition.attr("class") );

		if ( !newPosition.hasClass("block") )
		{
			g_Pacman.attr("class", "empty"); // current block is now empty
			newPosition.attr("class", "pacman"); // new block is now Pacman
			g_Pacman = newPosition; // move our global Pacman var to the new block
		}

	}
	// 39 - keyup right
	if( e.keyCode == 39 )
	{
		var newPosition = g_Pacman.next();

		if( !newPosition.length )
		{
			// We are at the end of the row! Loop back to the other side
			newPosition = g_Pacman.parent().children().eq(0);
		}

		g_nScore += GetPoints( newPosition.attr("class") );

		if ( !newPosition.hasClass("block") )
		{
			g_Pacman.attr("class", "empty"); // current block is now empty
			newPosition.attr("class", "pacman right"); // new block is now Pacman
			g_Pacman = newPosition; // move our global Pacman var to the new block
		}

	}
	// 38 - keyup up
	if( e.keyCode == 38 )
	{
		var newPosition = g_Pacman.parent().prev().children().eq(g_Pacman.index());

		if( !newPosition.length )
		{
			// We are at the end of the col! Loop back to the other side
			newPosition = g_Pacman.parent().parent().children().last().children().eq(g_Pacman.index());
		}

		g_nScore += GetPoints( newPosition.attr("class") );

		if ( !newPosition.hasClass("block") )
		{
			g_Pacman.attr("class", "empty"); // current block is now empty
			newPosition.attr("class", "pacman up"); // new block is now Pacman
			g_Pacman = newPosition; // move our global Pacman var to the new block
		}

	}
	// 40 - keyup down;
	if( e.keyCode == 40 )
	{
		var newPosition = g_Pacman.parent().next().children().eq(g_Pacman.index());

		if( !newPosition.length )
		{
			// We are at the end of the col! Loop back to the other side
			newPosition = g_Pacman.parent().parent().children().first().children().eq(g_Pacman.index());
		}

		g_nScore += GetPoints( newPosition.attr("class") );

		if ( !newPosition.hasClass("block") )
		{
			g_Pacman.attr("class", "empty"); // current block is now empty
			newPosition.attr("class", "pacman down"); // new block is now Pacman
			g_Pacman = newPosition; // move our global Pacman var to the new block
		}

	}

	$("#score").text(g_nScore);
}


function validateBoard(){
	// the start and end of a row should both be empty
	// the start and end of a column should both be empty
	return true;
}

function Pacman()
{
	var jqLocation = $(".pacman");
	var jqNextLocation = {};
	var nScore = 0;

	this.moveRight = function()
	{

	}

	this.moveLeft = function()
	{

	}

	this.moveUp = function () {

	}

	this.moveDown = function () {

	}

	this.spawn()
	{
		var validBlocks = $(".empty, .coin");
		var randBlock = Math.floor(Math.random()*validBlocks.length);
		console.log("Block",randBlock);
		this.jqLocation = $(validBlocks[randBlock]);
		this.jqLocation.attr("class", "pacman");
	}
}

function Ghost()
{
	// Randomly generate a direction 0-3 IGNORE

	// Go in a direction until you hit something then randomly change direction
	// UNLESS pacman is in your row or column, then change direction to face him
}

function PlayGround()
{
	var counter = 0;  //counts the number of circles created
	var ghost = [ ]; //array that will hold all the ghosts created in the app
	var cherry = {};

	//a loop that updates the circle's position on the screen
	this.loop = function(){

		if( !cherry.length )
		{
			// no cherry, so lets roll the dice and see if we spawn one!
			var randSpin = Math.floor(Math.random()*100); // spin it to win it
			console.log( "Spin:", randSpin );
			if( randSpin % 100 < 25)
			{
				console.log("Cherry time!")
				var validBlocks = $(".empty, .coin");
				var randBlock = Math.floor(Math.random()*validBlocks.length);
				console.log("Block",randBlock);
				cherry = $(validBlocks[randBlock]);
				cherry.attr("class", "cherry");
				console.log(cherry);
			}
		}
	}

	this.createCherry = function( element ){
		cherry = $(element);
		cherry.attr("class", "cherry");
		// bjLog('created a new circle!', new_circle); TO DO: fix bjLog to take multiple parameters
	}

	//create one circle when the game starts
	//this.createNewCircle(document.body.clientWidth/2, document.body.clientHeight/2);
}




var playground = new PlayGround();


$().ready(function () {
	g_Pacman = $(".pacman");
	$(document).keyup(function (e){movePacman(e);});

	setInterval(playground.loop, 1000);
});
