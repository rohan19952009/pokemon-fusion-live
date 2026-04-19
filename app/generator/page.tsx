"use client";

import { useEffect, useState } from 'react';
import { useGeneratorStore } from '@/lib/store/generator';
import { PokemonSelector } from '@/components/pokemon-selector';
import { FusionPreview } from '@/components/fusion-preview';
import { FusionStatsCard } from '@/components/fusion-stats-card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Save, ArrowLeftRight } from 'lucide-react';
import { Fusion } from '@/types';

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
      const res = await fetch(`/api/fusion?head=${headPokemon.id}&body=${bodyPokemon.id}`);
      if (res.ok) {
        const data = await res.json();
        setFusionResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    fetchFusion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headPokemon, bodyPokemon]);

  return (
    <div className="container py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Selectors & Controls */}
        <div className="lg:col-span-4 space-y-6 flex flex-col items-center lg:items-start">
          <div className="w-full text-center lg:text-left mb-4">
            <h1 className="text-3xl font-extrabold tracking-tight">Generator</h1>
            <p className="text-muted-foreground mt-2">Select a Head and a Body Pokémon to begin fusing.</p>
          </div>

          <div className="flex flex-col gap-6 w-full items-center lg:items-start p-6 border rounded-xl bg-card">
            <PokemonSelector 
              label="Head (Primary)" 
              selected={headPokemon} 
              onSelect={setHeadPokemon} 
            />
            
            <Button variant="ghost" size="icon" onClick={swapPokemon} className="rounded-full shadow-sm border bg-background" title="Swap Head and Body">
              <ArrowLeftRight className="w-4 h-4 rotate-90 lg:rotate-0" />
            </Button>
            
            <PokemonSelector 
              label="Body (Secondary)" 
              selected={bodyPokemon} 
              onSelect={setBodyPokemon} 
            />
          </div>

          <div className="flex w-full gap-4 mt-6">
            <Button variant="outline" className="flex-1" onClick={reset}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
               className="flex-1"
               disabled={!headPokemon || !bodyPokemon}
               onClick={() => {
                 // Save to favorites logic (local state mock)
                 alert("Saved to favorites!");
               }}
            >
              <Save className="w-4 h-4 mr-2" />
              Favorite
            </Button>
          </div>
        </div>

        {/* Right Column: Preview & Stats */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
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
