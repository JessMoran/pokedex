var pokeArray = [];
var numRows = [];
var maxPokemons = 15;

function getStoreArray() {

	var storedPokemonArray = localStorage.getItem('pokemon');
	if (storedPokemonArray == null || storedPokemonArray == "") {
		$.ajax({
		  url: 'https://pokeapi.co/api/v2/pokedex/1/',
		}).done(dataPokemon);

	}else {
		pokeArray = JSON.parse(storedPokemonArray);
		pokeArray.forEach(function(elem, i) {
			if (i%5==0) {
				numRows.push(i);
			};
		});
		drawPokemon();
	}
}


function dataPokemon(data) {
  for(let i = 0; i<= maxPokemons; i++){
	let name = data.pokemon_entries[i].pokemon_species.name;

	getSinglePokemon(name);

	if (i%5==0) {
		numRows.push(i);
	};
  }
}

function getSinglePokemon(name) {
	$.ajax({
		  url: 'https://pokeapi.co/api/v2/pokemon/'+name,
		}).done(function(data) {
			pokeArray.push(data);
			if(pokeArray.length==maxPokemons) {
				pokeArray.sort(function (a, b) {
				  return a.id - b.id;
				});
				localStorage.setItem('pokemon', JSON.stringify(pokeArray));
				drawPokemon();
			}
	});
}

function drawPokemon() {

	let pokemonHTML = '';

	numRows.forEach(function(elem) {
		pokemonHTML += '<div class="row">';

		var newPokeArray = pokeArray.slice(elem, elem+5);

		newPokeArray.forEach(function(pokemon) {
	  		pokemonHTML += '<div class="col-poke-20"><img src="' + pokemon.sprites.front_default + '"/>';
	  		pokemonHTML += '<p>' + pokemon.name + '</p>';
	  		pokemonHTML += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Info</button></div>';

	  		console.log(pokemon);

		});
		pokemonHTML += '</div>';

	});
	$("#pokemon-container").append(pokemonHTML);
}

getStoreArray();
