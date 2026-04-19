import { create } from 'zustand';
import { Pokemon } from '@/types';

interface GeneratorState {
  headPokemon: Pokemon | null;
  bodyPokemon: Pokemon | null;
  setHeadPokemon: (p: Pokemon | null) => void;
  setBodyPokemon: (p: Pokemon | null) => void;
  swapPokemon: () => void;
  reset: () => void;
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  headPokemon: null,
  bodyPokemon: null,
  setHeadPokemon: (p) => set({ headPokemon: p }),
  setBodyPokemon: (p) => set({ bodyPokemon: p }),
  swapPokemon: () => set((state) => ({ 
    headPokemon: state.bodyPokemon, 
    bodyPokemon: state.headPokemon 
  })),
  reset: () => set({ headPokemon: null, bodyPokemon: null })
}));
