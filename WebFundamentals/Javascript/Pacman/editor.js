var intervalId = 0;

var isMouseDown = false;

function resetTool()
{
	$("body").data("tool", "");
	$("body").attr("class", "");
}

function placeBlock()
{
	var tool = $("body").data("tool");

	if (tool == "pacman") {
		resetTool();
		$("#tools .pacman").addClass("disabled");
	}
	else if ( tool == "block" )
	{
		test = $(this).parent();
		console.log( $(this).parent().index() );
		if( $(this).index() == 19 )
		{
			$(this).siblings().first().attr("class", "block");
		}
		else if( $(this).index() == 0 )
		{
			$(this).siblings().last().attr("class", "block");
		}

		if( $(this).parent().index() == 0 )
		{
			$(this).parent().parent().children().last().children().eq( $(this).index() ).attr("class", "block");
		}
		else if( $(this).parent().index() == 19 )
		{
			$(this).parent().parent().children().first().children().eq( $(this).index() ).attr("class", "block");
		}
	}

	$("a").attr("href", "data:text/html," + document.getElementById("board").innerHTML );

	$(this).attr("class", tool);

}

var test = {};
$().ready(function () {

	var a = document.body.appendChild(
		document.createElement("a")
	);
	a.download = "export.html";
	a.href = "data:text/html," + document.getElementById("board").innerHTML;
	a.innerHTML = "[Export Content]";

	$("#tools > div").click(function (e) {
		console.log("Clicked on", $(this));

		if( !$(this).hasClass("disabled") )
		{
			var tool = $(this).attr("class");
			$("body").data("tool", tool);
			$("body").attr("class", tool + "Tool");
		}
	});

	$("#board").on('click', '.empty', function (e) {
		var tool = $("body").data("tool");

		if (tool == "pacman") {
			resetTool();
			$("#tools .pacman").addClass("disabled");
		}
		else if ( tool == "block" )
		{
			test = $(this).parent();
			console.log( $(this).parent().index() );
			if( $(this).index() == 19 )
			{
				$(this).siblings().first().attr("class", "block");
			}
			else if( $(this).index() == 0 )
			{
				$(this).siblings().last().attr("class", "block");
			}

			if( $(this).parent().index() == 0 )
			{
				$(this).parent().parent().children().last().children().eq( $(this).index() ).attr("class", "block");
			}
			else if( $(this).parent().index() == 19 )
			{
				$(this).parent().parent().children().first().children().eq( $(this).index() ).attr("class", "block");
			}
		}

		$("a").attr("href", "data:text/html," + document.getElementById("board").innerHTML );

		$(this).attr("class", tool);

	});

	$("#board").on("mousedown", ".row > div", function (e) {
		if( $("body").data("tool") != "pacman" )
		{
			isMouseDown = true;
			$(this).toggleClass("drag");
			return false; // prevent text selection
		}
	});

	$("#board").on("mouseover", ".row > div", function () {
		if (isMouseDown) {
			$(this).toggleClass("drag");
		}
	})

	$('#start').click(function () {
		$.getScript("game.js");
	});

	$("h2").click(function () {
		$(this).attr("contenteditable", "true");
	});

	$("h2").keyup(function (e){
		$("a").attr("download", $(this).text().replace(/\s/g,'') + ".bujo");
	});

	$(document)
		.mouseup(function () {
			isMouseDown = false;
			var blocksToUpdate = $(".drag");
			if( blocksToUpdate.length )
			{
				blocksToUpdate.attr("class", $("body").data("tool") );
			}
		});

});