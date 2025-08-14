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
fetchData();
async function fetchData() {
  
  try{
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/mewtwo")

    if (!response.ok){
      throw new Error("could not fetch resource");
    }

    const data = await response.json()
    console.log(data)
  }
  catch(error){
    console.error(error)
  }
}