import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchPokemonData(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      types: data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
      spriteUrls: {
        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      },
      stats: {
        hp: data.stats.find(s => s.stat.name === 'hp').base_stat,
        attack: data.stats.find(s => s.stat.name === 'attack').base_stat,
        defense: data.stats.find(s => s.stat.name === 'defense').base_stat,
        specialAttack: data.stats.find(s => s.stat.name === 'special-attack').base_stat,
        specialDefense: data.stats.find(s => s.stat.name === 'special-defense').base_stat,
        speed: data.stats.find(s => s.stat.name === 'speed').base_stat,
      },
      abilities: data.abilities.map(a => a.ability.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()))
    };
  } catch (e) {
    console.error(`Failed to fetch ${id}`);
    return null;
  }
}

async function run() {
  const MAX_POKEMON = 300; // Gen 1-2 + part of 3 to stay fast and light
  console.log(`Fetching ${MAX_POKEMON} Pokemon from PokeAPI...`);
  
  const results = [];
  // Chunking to avoid rate limits
  const chunkSize = 20;
  for (let i = 1; i <= MAX_POKEMON; i += chunkSize) {
    const batch = [];
    for (let j = i; j < i + chunkSize && j <= MAX_POKEMON; j++) {
      batch.push(fetchPokemonData(j));
    }
    const chunkResults = await Promise.all(batch);
    results.push(...chunkResults.filter(r => r !== null));
    console.log(`Fetched up to ${Math.min(i + chunkSize - 1, MAX_POKEMON)}`);
  }

  const fileContent = `import { Pokemon } from '@/types';

export const POKEMON_DB: Pokemon[] = ${JSON.stringify(results, null, 2)};

export function searchPokemon(query: string): Pokemon[] {
  const q = query.toLowerCase().trim();
  if (q === '') return [];
  return POKEMON_DB.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.id.toString() === q ||
    p.types.some(t => t.toLowerCase().includes(q))
  ).slice(0, 20); // Limit results to prevent UI lag
}

export function getPokemonById(id: number): Pokemon | undefined {
  return POKEMON_DB.find(p => p.id === id);
}
`;

  fs.writeFileSync(path.join(__dirname, '../lib/data/pokemon.ts'), fileContent);
  console.log('Successfully wrote to lib/data/pokemon.ts');
}

run();
