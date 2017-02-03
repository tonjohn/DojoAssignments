const ENABLE_CACHE = true;

const API_URL = "http://pokeapi.co/api/v2/pokemon/"; // URL to Pokemon API that fetches list of pokemon
const COUNT_ORIGINAL_POKEMON = 151; // we only care about the original 151 Pokemon
const POKEMON_IMG_URL = "http://pokeapi.co/media/img/"; // http://pokeapi.co/media/img/1.png

var g_rgPokemon = []; // global array of pokemon

window.onload = function() {
	if (!window.jQuery) {
		// jQuery is loaded
		alert("jQuery is not loaded!");
	}
}

function clearCache() {
	localStorage.removeItem("pokemon");
}

function getPokemonImg( objPokemon, i ) {
	var elImg = $('<img />', {
		id: objPokemon.name,
		src: POKEMON_IMG_URL + i + ".png",
		alt: objPokemon.name,
		title: objPokemon.name
	});
	$("body").append( elImg );
}

function renderPokemon() {
	if( typeof g_rgPokemon != undefined )
	{
		for (var i = 0; i < g_rgPokemon.length; i++) {
			getPokemonImg(g_rgPokemon[i], i + 1);
		}
	}
}

function getPokemonPromise() {

	if( ENABLE_CACHE && ( g_rgPokemon = localStorage.getItem("pokemon") ) )
	{
		// get our pokemon from the cache
		g_rgPokemon = JSON.parse( g_rgPokemon );
		console.log("Successfully loaded from cache!");
		return $.Deferred().resolve().promise();;
	}
	else
	{
		return $.get( API_URL, {limit:COUNT_ORIGINAL_POKEMON}, function () {
			console.log( "Empty cache. Requesting from " + API_URL );
		}).done(function( data ) {
			console.log( "Received data from " + API_URL );
			g_rgPokemon = data.results;
			if( data.results.length )
			{
				localStorage.setItem( "pokemon", JSON.stringify(g_rgPokemon) );
			}

		});
	}

}

$().ready(function () {

	getPokemonPromise().done( function(){
		console.log("getPokemonPromise().done()")
		renderPokemon();
	});

});
