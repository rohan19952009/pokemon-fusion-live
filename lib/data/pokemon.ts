import { Pokemon } from "@/types";

export const POKEMON_DB: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    slug: "bulbasaur",
    generation: 1,
    types: ["Grass", "Poison"],
    stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
    abilities: ["Overgrow", "Chlorophyll"],
    spriteUrls: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    artworkUrls: {
      official: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    }
  },
  {
    id: 4,
    name: "Charmander",
    slug: "charmander",
    generation: 1,
    types: ["Fire"],
    stats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
    abilities: ["Blaze", "Solar Power"],
    spriteUrls: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
    },
    artworkUrls: {
      official: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    }
  },
  {
    id: 7,
    name: "Squirtle",
    slug: "squirtle",
    generation: 1,
    types: ["Water"],
    stats: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 },
    abilities: ["Torrent", "Rain Dish"],
    spriteUrls: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    },
    artworkUrls: {
      official: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    }
  },
  {
    id: 25,
    name: "Pikachu",
    slug: "pikachu",
    generation: 1,
    types: ["Electric"],
    stats: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 },
    abilities: ["Static", "Lightning Rod"],
    spriteUrls: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    },
    artworkUrls: {
      official: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    }
  },
  {
    id: 94,
    name: "Gengar",
    slug: "gengar",
    generation: 1,
    types: ["Ghost", "Poison"],
    stats: { hp: 60, attack: 65, defense: 60, specialAttack: 130, specialDefense: 75, speed: 110 },
    abilities: ["Cursed Body"],
    spriteUrls: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
    },
    artworkUrls: {
      official: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
    }
  },
  {
    id: 130,
    name: "Gyarados",
    slug: "gyarados",
    generation: 1,
    types: ["Water", "Flying"],
    stats: { hp: 95, attack: 125, defense: 79, specialAttack: 60, specialDefense: 100, speed: 81 },
    abilities: ["Intimidate", "Moxie"],
    spriteUrls: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png"
    },
    artworkUrls: {
      official: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png"
    }
  },
  {
    id: 143,
    name: "Snorlax",
    slug: "snorlax",
    generation: 1,
    types: ["Normal"],
    stats: { hp: 160, attack: 110, defense: 65, specialAttack: 65, specialDefense: 110, speed: 30 },
    abilities: ["Immunity", "Thick Fat", "Gluttony"],
    spriteUrls: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"
    },
    artworkUrls: {
      official: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
    }
  },
  {
    id: 150,
    name: "Mewtwo",
    slug: "mewtwo",
    generation: 1,
    types: ["Psychic"],
    stats: { hp: 106, attack: 110, defense: 90, specialAttack: 154, specialDefense: 90, speed: 130 },
    abilities: ["Pressure", "Unnerve"],
    spriteUrls: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
    },
    artworkUrls: {
      official: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
    }
  }
];

export function getPokemonById(id: number): Pokemon | undefined {
  return POKEMON_DB.find(p => p.id === id);
}

export function searchPokemon(query: string): Pokemon[] {
  const q = query.toLowerCase();
  return POKEMON_DB.filter(p => p.name.toLowerCase().includes(q) || p.id.toString() === q);
}
