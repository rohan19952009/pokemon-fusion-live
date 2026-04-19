export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface Pokemon {
  id: number;
  name: string;
  slug: string;
  generation: number;
  types: string[]; // e.g., ["Fire", "Flying"]
  stats: PokemonStats;
  abilities: string[];
  spriteUrls: {
    front_default: string;
    front_shiny?: string;
  };
  artworkUrls: {
    official: string;
  };
}

export interface Fusion {
  headId: number;
  bodyId: number;
  fusionName: string;
  type1: string;
  type2?: string;
  stats: PokemonStats;
  abilities: string[];
  spriteMode: 'custom' | 'auto';
  spriteUrl: string;
  // Metadata about the generated fusion
  weaknesses: string[];
  resistances: string[];
}

export interface Favorite {
  id: string;
  userId: string | null;
  guestSessionId: string | null;
  headId: number;
  bodyId: number;
  createdAt: string;
}

export interface SpriteAsset {
  key: string;
  headId: number;
  bodyId: number;
  sourceType: 'auto' | 'custom';
  filePath: string;
  artistCredit: string | null;
  tags: string[];
  createdAt: string;
}
