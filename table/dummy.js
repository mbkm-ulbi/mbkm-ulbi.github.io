import { timeout } from "../src/js/libraries/utilities.js";

export const dummyPokemon = async (page = 1) => {
  await timeout(300);

  if (page === 1)
    return {
      count: 10,
      data: [
        {
          id: 1,
          name: "bulbasaur",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          url: "https://pokeapi.co/api/v2/pokemon/1",
          abilities: ["overgrow", "chlorophyll"],
        },
        {
          id: 4,
          name: "charmander",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
          url: "https://pokeapi.co/api/v2/pokemon/4",
          abilities: ["blaze", "solar-power"],
        },
        {
          id: 7,
          name: "squirtle",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
          url: "https://pokeapi.co/api/v2/pokemon/7",
          abilities: ["torrent", "rain-dish"],
        },
        {
          id: 10,
          name: "caterpie",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
          url: "https://pokeapi.co/api/v2/pokemon/10",
          abilities: ["shield-dust", "run-away"],
        },
        {
          id: 13,
          name: "weedle",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
          url: "https://pokeapi.co/api/v2/pokemon/13",
          abilities: ["shield-dust", "run-away"],
        },
      ],
    };
  else if (page === 2)
    return {
      count: 10,
      data: [
        {
          id: 2,
          name: "ivysaur",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          url: "https://pokeapi.co/api/v2/pokemon/2",
          abilities: ["overgrow", "chlorophyll"],
        },
        {
          id: 5,
          name: "charmeleon",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
          url: "https://pokeapi.co/api/v2/pokemon/5",
          abilities: ["blaze", "solar-power"],
        },
        {
          id: 8,
          name: "wartortle",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
          url: "https://pokeapi.co/api/v2/pokemon/8",
          abilities: ["torrent", "rain-dish"],
        },
        {
          id: 11,
          name: "metapod",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
          url: "https://pokeapi.co/api/v2/pokemon/11",
          abilities: ["shed-skin", "run-away"],
        },
        {
          id: 14,
          name: "kakuna",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
          url: "https://pokeapi.co/api/v2/pokemon/14",
          abilities: ["shed-skin", "run-away"],
        },
      ],
    };
  else if (page === 3)
    return {
      count: 10,
      data: [
        {
          id: 3,
          name: "venusaur",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
          url: "https://pokeapi.co/api/v2/pokemon/3",
          abilities: ["overgrow", "chlorophyll"],
        },
        {
          id: 6,
          name: "charizard",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
          url: "https://pokeapi.co/api/v2/pokemon/6",
          abilities: ["blaze", "solar-power"],
        },
        {
          id: 9,
          name: "blastoise",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
          url: "https://pokeapi.co/api/v2/pokemon/9",
          abilities: ["torrent", "rain-dish"],
        },
        {
          id: 12,
          name: "butterfree",
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
          url: "https://pokeapi.co/api/v2/pokemon/12",
          abilities: ["shed-skin", "compound-eyes"],
        },
      ],
    };
  else {
    return {
      count: 10,
      data: [],
    };
  }
};
