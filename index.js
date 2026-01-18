/*
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then(response => {
    //for error
    if (!response.ok){
        throw new Error("could not fetch resource")
    }
    return response.json();
  })
  .then(data => console.log(data.id))
  .catch(error => console.log(error))
*/

//async/await version
fetchPokemon();
async function fetchPokemon() {
  
  try{

    const pokemonName = document.getElementById("pokemonName").value.toLocaleLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    if (!response.ok){
      throw new Error("could not fetch resource");
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imageElem = document.getElementById("pokemonSprite")

    imageElem.src = pokemonSprite
    imageElem.style.display = "block"
    
    // Fetch and display moves as buttons
    displayAttackButtons(data.moves)
  }
  catch(error){
    console.error(error)
    document.querySelector('.js-attack-name').textContent = 'Pokemon not found!'
  }
}

function displayAttackButtons(moves) {
  const attackButtonsContainer = document.getElementById('attackButtons');
  attackButtonsContainer.innerHTML = '';
  
  // Get first 8 moves to avoid too many buttons
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

async function fetchAttackDetails(moveName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}/`);
    
    if (!response.ok) {
      throw new Error("Could not fetch move");
    }
    
    const data = await response.json();
    const resultDiv = document.querySelector('.js-attack-name');
    resultDiv.textContent = `${data.name.toUpperCase()}: Power ${data.power || 'N/A'} | Accuracy ${data.accuracy || 'N/A'}%`;
  } catch(error) {
    document.querySelector('.js-attack-name').textContent = 'attack is not real'
  }
}

