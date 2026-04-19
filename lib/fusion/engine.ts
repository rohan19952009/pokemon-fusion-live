import { Pokemon, PokemonStats } from '@/types';

// Simplified type calculation rules
// Default: Head gives primary type, Body gives secondary type (if different)
export function calculateTypes(head: Pokemon, body: Pokemon): [string, string?] {
  const primaryType = head.types[0];
  const secondaryTypeCandidate = body.types.length > 1 ? body.types[1] : body.types[0];
  
  if (primaryType !== secondaryTypeCandidate) {
    return [primaryType, secondaryTypeCandidate];
  }
  return [primaryType];
}

// Split string at vowel heuristic
function splitName(name: string): [string, string] {
  const vowels = ['A', 'E', 'I', 'O', 'U', 'Y', 'a', 'e', 'i', 'o', 'u', 'y'];
  let splitIndex = Math.floor(name.length / 2);
  
  for (let i = Math.floor(name.length / 2); i < name.length; i++) {
    if (vowels.includes(name[i])) {
      splitIndex = i;
      break;
    }
  }
  return [name.substring(0, splitIndex), name.substring(splitIndex)];
}

export function generateFusionName(head: Pokemon, body: Pokemon): string {
  const headParts = splitName(head.name);
  const bodyParts = splitName(body.name);
  return headParts[0] + bodyParts[1];
}

export function calculateStats(head: Pokemon, body: Pokemon): PokemonStats {
  // Head gives 2/3 of special stats and speed? Or body bulk?
  // Let's use standard weighted formula:
  // HP: 2/3 Body + 1/3 Head
  // Atk: 2/3 Body + 1/3 Head
  // Def: 2/3 Body + 1/3 Head
  // SpA: 2/3 Head + 1/3 Body
  // SpD: 2/3 Head + 1/3 Body
  // Spe: 2/3 Head + 1/3 Body
  
  return {
    hp: Math.floor((body.stats.hp * 2 + head.stats.hp) / 3),
    attack: Math.floor((body.stats.attack * 2 + head.stats.attack) / 3),
    defense: Math.floor((body.stats.defense * 2 + head.stats.defense) / 3),
    specialAttack: Math.floor((head.stats.specialAttack * 2 + body.stats.specialAttack) / 3),
    specialDefense: Math.floor((head.stats.specialDefense * 2 + body.stats.specialDefense) / 3),
    speed: Math.floor((head.stats.speed * 2 + body.stats.speed) / 3),
  };
}

export function mergeAbilities(head: Pokemon, body: Pokemon): string[] {
  const candidates = [...head.abilities, ...body.abilities];
  return Array.from(new Set(candidates)).slice(0, 3);
}
