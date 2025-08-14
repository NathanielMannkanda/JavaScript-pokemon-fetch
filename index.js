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