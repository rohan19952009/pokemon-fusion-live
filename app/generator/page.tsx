"use client";

import { useEffect, useState } from 'react';
import { useGeneratorStore } from '@/lib/store/generator';
import { PokemonModalSelector } from '@/components/pokemon-modal-selector';
import { FusionPreview } from '@/components/fusion-preview';
import { FusionStatsCard } from '@/components/fusion-stats-card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Save, ArrowLeftRight } from 'lucide-react';
import { Fusion } from '@/types';
import { calculateStats, calculateTypes, generateFusionName, mergeAbilities } from '@/lib/fusion/engine';
import { calculateWeaknessesAndResistances } from '@/lib/fusion/type-chart';
import { POKEMON_DB } from '@/lib/data/pokemon';

const typeColors: Record<string, string> = {
  Normal: '#A8A77A', Fire: '#EE8130', Water: '#6390F0', Electric: '#F7D02C',
  Grass: '#7AC74C', Ice: '#96D9D6', Fighting: '#C22E28', Poison: '#A33EA1',
  Ground: '#E2BF65', Flying: '#A98FF3', Psychic: '#F95587', Bug: '#A6B91A',
  Rock: '#B6A136', Ghost: '#735797', Dragon: '#6F35FC', Dark: '#705898',
  Steel: '#B7B7CE', Fairy: '#D685AD',
};

export default function GeneratorPage() {
  const { headPokemon, bodyPokemon, setHeadPokemon, setBodyPokemon, swapPokemon, reset } = useGeneratorStore();
  const [fusionResult, setFusionResult] = useState<Fusion | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchFusion = async () => {
    if (!headPokemon || !bodyPokemon) {
      setFusionResult(null);
      return;
    }
    
    setIsGenerating(true);
    try {
      const name = generateFusionName(headPokemon, bodyPokemon);
      const types = calculateTypes(headPokemon, bodyPokemon);
      const stats = calculateStats(headPokemon, bodyPokemon);
      const abilities = mergeAbilities(headPokemon, bodyPokemon);
      const { weaknesses, resistances } = calculateWeaknessesAndResistances(types[0], types[1]);

      const fusionResult: Fusion = {
        headId: headPokemon.id,
        bodyId: bodyPokemon.id,
        fusionName: name,
        type1: types[0],
        type2: types[1],
        stats,
        abilities,
        spriteMode: 'auto',
        spriteUrl: `https://images.alexonsager.net/pokemon/fused/${bodyPokemon.id}/${bodyPokemon.id}.${headPokemon.id}.png`,
        weaknesses,
        resistances
      };

      setFusionResult(fusionResult);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomize = () => {
    const r1 = Math.floor(Math.random() * POKEMON_DB.length);
    const r2 = Math.floor(Math.random() * POKEMON_DB.length);
    setHeadPokemon(POKEMON_DB[r1]);
    setBodyPokemon(POKEMON_DB[r2]);
  };

  useEffect(() => {
    fetchFusion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headPokemon, bodyPokemon]);

  const bgGradient = fusionResult 
    ? `linear-gradient(135deg, ${typeColors[fusionResult.type1] || '#ccc'} 0%, ${typeColors[fusionResult.type2 || fusionResult.type1] || '#eee'} 100%)`
    : '';

  return (
    <div className="container py-8 max-w-6xl relative">
      {/* Subtle dynamic background */}
      {fusionResult && (
         <div 
           className="absolute inset-0 opacity-10 blur-3xl rounded-full mix-blend-multiply dark:mix-blend-screen transition-all duration-1000 -z-10"
           style={{ background: bgGradient }}
         />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-full">
        
        {/* Left Column: Selectors & Controls */}
        <div className="space-y-6 flex flex-col items-center lg:items-start w-full">
          <div className="w-full text-center lg:text-left mb-4">
            <h1 className="text-3xl font-extrabold tracking-tight">Generator</h1>
            <p className="text-muted-foreground mt-2">Select a Head and a Body Pokémon to begin fusing.</p>
          </div>

          {/* Primary Selection Cards (Side-by-Side Flex) */}
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 w-full justify-center lg:justify-start items-center p-6 border rounded-xl bg-card relative z-30 shadow-sm">
            <PokemonModalSelector 
              label="Head" 
              selected={headPokemon} 
              onSelect={setHeadPokemon} 
            />
            
            <div className="flex flex-col items-center justify-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={swapPokemon} 
                className="rounded-full shadow-sm border bg-background hover:bg-muted transition-all rotate-90 sm:rotate-0" 
                title="Swap Head and Body"
              >
                <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
            
            <PokemonModalSelector 
              label="Body" 
              selected={bodyPokemon} 
              onSelect={setBodyPokemon} 
            />
          </div>

          <div className="flex w-full gap-2 mt-6 relative z-10">
            <Button variant="outline" className="flex-1 text-xs" onClick={reset}>
              <RefreshCcw className="w-3 h-3 mr-1" />
              Clear
            </Button>
            <Button variant="outline" className="flex-1 text-xs whitespace-nowrap px-1" onClick={handleRandomize}>
               Randomize
            </Button>
            <Button 
               className="flex-1 text-xs"
               disabled={!headPokemon || !bodyPokemon}
               onClick={() => {
                 alert("Saved to favorites!");
               }}
            >
              <Save className="w-3 h-3 mr-1" />
              Fav
            </Button>
          </div>
        </div>

        {/* Right Column: Preview & Stats */}
        <div className="flex flex-col gap-6 w-full max-w-full">
          {/* Main Visualizer */}
          <FusionPreview fusion={fusionResult} loading={isGenerating} />
          
          {/* Stats Board */}
          {fusionResult && (
            <FusionStatsCard fusion={fusionResult} />
          )}
        </div>
        
      </div>
    </div>
  );
}
