User instructions

User will see the automatic list of pokemons deployed, can clicked on them and see the information that belongs to the clicked pokemon, also can use the search bar to find the wanted pokemon.

Technical instructions

The first thing the programmer will find is a variable called "deployedPokemons" initialized in 150 that can be modified in order to render more or less pokemons in the pokedex section.

The start function receives this mentioned variable and will init the app with a for buckle sending a diferent id to be rendered on the first fetch function called "getPokedex", when for buckle ends, the complete list of 150 pokemons must be rendered and we can click on them.

Notice that the list of pokemons starts an event listener but will only works if the user clicks on the div, it does not work if user clicks on img, name or id.(It needs to be improved).

Then we have 2 more fetches for evolved pokemons where we found the name but not the image of evolveds.(It needs to be improved by calling imgs from first fetch API or find the way how to do it).

The search section is till uncompleted, the way it works is by sending data from fetch between some functions but it should not be the rightly way to do it.(It needs to be improved).

                    ***---***
Notes: 
Some options are still not ended. The search bar option is still pending of programming but the logic is understandable by now. The evolved pokemon img could be found, it is needed to implement a logical where is is selected from pokedex or from pokemon list normal API.

Personal learning: I need to learn how to execute 2 fetches or more at the time in a same function.

Tasks: try to develop the test in MERN stack.