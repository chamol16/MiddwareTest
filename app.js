//this var defines how many pokemons will be deployed in pokedex
const deployedPokemons = 150;

//render pokedex
getPokedex = (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pokeScroll = document.querySelector(".scroll-pokedex");
      const newElement = document.createElement("div");
      newElement.innerHTML = `
      <img src= ${data.sprites.front_default}>
      <h4 class="capital">${data.name}</h4>
      <p>#${id}</p>`;
      newElement.id = id;
      newElement.classList.add("poke-divs");
      pokeScroll.appendChild(newElement);

      const pokeDivs = document.querySelectorAll(".poke-divs");
      pokeDivs.forEach((div) => div.addEventListener("click", renderPokemon));
    })
    .catch((err) => console.log(err));
};

start = (quantity) => {
  for (let i = 1; i < quantity + 1; i++) {
    let id = i;
    getPokedex(id);
  }
};

start(deployedPokemons);

//render pokemons after click on div of pokedex
renderPokemon = (e) => {
  let id = e.target.id;
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //  console.log(data);

      let img = document.getElementById("api-img-container");
      img.innerHTML = `
      <img src= ${data.sprites.front_default}>
      `;
      let pokeName = document.getElementById("poke-name");
      pokeName.innerHTML = `
      <div>
      <h3 class="capital" id="poke-name">
        ${data.name}
      </h3>
    </div>
      `;
      let type1 = document.getElementById("type-one");
      let type2 = document.getElementById("type-two");

      type1.innerHTML = `${JSON.stringify(data.types[0].type.name).replaceAll(
        `"`,
        ``
      )}`;
      type2.innerHTML = `${JSON.stringify(data.types[1].type.name).replaceAll(
        `"`,
        ``
      )}`;

      let pokeInfo = document.getElementById("poke-info-container");
      pokeInfo.innerHTML = `
      <div class="info-container">
      <h4>Information</h4>
      </div>
  
      <div class="info-container">
      <h4>Weight:</h4>
      <p>${data.weight}</p>
      </div>
  
      <div class="info-container">
      <h4>Height:</h4>
      <p>${data.height}</p>
      </div>
  
      <div class="info-container">
      <h4>Species:</h4>
      <p class="capital">${data.species.name}</p>
      </div>
  
      <div class="info-container">
      <h4>Egg Groups:</h4>
      <p class="capital" id="egg"></p>
      </div>
  
      <div class="info-container">
      <h4>Abilities:</h4>
        <div class="abilities">
          <p class="capital">${JSON.stringify(
            data.abilities[0].ability.name
          ).replaceAll(`"`, ``)}</p>
         <p class="capital">${JSON.stringify(
           data.abilities[1].ability.name
         ).replaceAll(`"`, ``)}</p>
        </div> 
      </div> 
      `;

      //render evolution chart section
      evolution(data);
    })

    .catch((err) => console.log(err));

  //fetch for eggGroups(different http route)

  const eggGroups = `https://pokeapi.co/api/v2/egg-group/${id}/`;
  fetch(eggGroups)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let egg = document.getElementById("egg");
      egg.innerHTML = `${data.name}`;
    })
    .catch((err) => console.log(err));
};

/*evolved pokemons section. Could not find images of evolved in the api, only names so
I need to find a way to render the images from first api(pokedex) or make 2 fetches at the time*/
evolution = (pokemonList) => {
  const evolved = `https://pokeapi.co/api/v2/evolution-trigger/1/`;

  fetch(evolved)
    .then((response) => response.json())
    .then((data) => {
      console.log(pokemonList);
      let nonEvolved = document.getElementById("non-evolved");
      let evolution1 = document.getElementById("evolution-1");
      let evolution2 = document.getElementById("evolution-2");

      nonEvolved.innerHTML = `
      <img src= ${pokemonList.sprites.front_default}>
      <p class="capital">${pokemonList.species.name}</p>
      `;

      evolution1.innerHTML = `
      <img src= ${pokemonList.sprites.front_default}>
      <p class="capital">${data.pokemon_species[0].name}</p>
      `;

      evolution2.innerHTML = `
      <img src= ${pokemonList.sprites.front_default}>
      <p class="capital">${data.pokemon_species[1].name}</p>
      `;

      /*  const pokeDivs = document.querySelectorAll(".poke-divs");
      // console.log(pokeDivs); 
      pokeDivs.forEach((div) => console.log("pokeDivs")); */
    });
};

const serchingBar = document.getElementById("search-bar").value;
//console.log(serchingBar);
const pkmArray = [];

buildLocalPokemon = (id, name, img) => {
  pkmArray.push({
    id,
    name,
    img,
  });
  findPokemon(pkmArray);
};

findPokemon = (pokemonList) => {
  const pokemonFound = pokemonList.find(
    (pokemon) => pokemon.name === serchingBar
  );
  //render pokemonFound

  let renderFound = document.getElementById("render-found");
  const newPokemonFind = document.createElement("div");
  renderFound.appendChild(newPokemonFind);
  newPokemonFind.classList.add("poke-local-divs");

  newPokemonFind.innerHTML = `
  <img src= ${pokemonFound.img}>
  <h4 class="capital">${pokemonFound.name}</h4>
  <p>#${pokemonFound.id}</p>`;

  const pokeDivs = document.querySelectorAll(".poke-local-divs");
  pokeDivs.forEach((div) => div.addEventListener("click", renderLocalPokemon));
};

//render from local pokedex clicked

renderLocalPokemon = (e) => {
  let id = e.target.id;
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //  console.log(data);

      let img = document.getElementById("local-img-container");
      img.innerHTML = `
      <img src= ${data.sprites.front_default}>
      `;
      let pokeName = document.getElementById("poke-local-name");
      pokeName.innerHTML = `
      <div>
      <h3 class="capital"">
        ${data.name}
      </h3>
    </div>
      `;
      //render evolution local
      // evolutionLocal(data);
    })

    .catch((err) => console.log(err));
};
