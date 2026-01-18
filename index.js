// Initialize app by calling fetchPokemon when page loads
fetchPokemon();

 //Fetches Pokemon data from PokeAPI and displays sprite and moves
async function fetchPokemon() {
  try {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Could not fetch Pokemon");
    }

    const data = await response.json();
    displayPokemonSprite(data.sprites.front_default);
    displayAttackButtons(data.moves);
  } catch (error) {
    console.error(error);
    document.querySelector('.js-attack-name').textContent = 'Pokemon not found!';
  }
}

/**
 * Displays the Pokemon sprite image
 * @param {string} spriteUrl - URL of the Pokemon sprite
 */
function displayPokemonSprite(spriteUrl) {
  const imageElem = document.getElementById("pokemonSprite");
  imageElem.src = spriteUrl;
  imageElem.style.display = "block";
}

/**
 * Creates and displays attack move buttons for the selected Pokemon
 * Limits to first 8 moves to avoid cluttering the UI
 * @param {array} moves - Array of move objects from Pokemon API
 */
function displayAttackButtons(moves) {
  const attackButtonsContainer = document.getElementById('attackButtons');
  attackButtonsContainer.innerHTML = '';
  
  const limitedMoves = moves.slice(0, 8);
  
  limitedMoves.forEach(moveObj => {
    const moveName = moveObj.move.name;
    const button = document.createElement('button');
    button.className = 'attack-btn';
    button.textContent = moveName.toUpperCase().replace(/-/g, ' ');
    button.onclick = () => fetchAttackDetails(moveName);
    attackButtonsContainer.appendChild(button);
  });
}

/**
 * Fetches detailed move information and displays power and accuracy
 * @param {string} moveName - Name of the move to fetch
 */
async function fetchAttackDetails(moveName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}/`);
    
    if (!response.ok) {
      throw new Error("Could not fetch move");
    }
    
    const data = await response.json();
    const resultDiv = document.querySelector('.js-attack-name');
    const power = data.power || 'N/A';
    const accuracy = data.accuracy || 'N/A';
    
    resultDiv.textContent = `${data.name.toUpperCase()}: Power ${power} | Accuracy ${accuracy}%`;
  } catch (error) {
    document.querySelector('.js-attack-name').textContent = 'Attack is not real!';
  }
}

