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
  }
  catch(error){
    console.error(error)
  }
}