"use client";

import { useEffect, useState } from 'react';
import { Pokemon } from '@/types';
import { POKEMON_DB, searchPokemon } from '@/lib/data/pokemon';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function DexPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!search) {
      setPokemon(POKEMON_DB);
      return;
    }
    setPokemon(searchPokemon(search));
  }, [search]);

  return (
    <div className="container py-12 max-w-7xl space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
         <h1 className="text-4xl font-extrabold">Pokédex Browser</h1>
         <p className="text-muted-foreground max-w-2xl">
           Browse available Base Pokémon to use in your fusions.
         </p>
         <Input 
           placeholder="Search Pokémon..." 
           className="max-w-md mx-auto"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
         />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pokemon.map(p => (
           <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-card/50">
             <CardContent className="p-4 flex flex-col items-center cursor-pointer">
               <div className="relative w-24 h-24 mb-4">
                 <Image src={p.spriteUrls.front_default} alt={p.name} fill className="object-contain drop-shadow-md" unoptimized />
               </div>
               <span className="text-xs text-muted-foreground mb-1">#{p.id.toString().padStart(3, '0')}</span>
               <h3 className="font-bold text-lg mb-2">{p.name}</h3>
               <div className="flex gap-2">
                 {p.types.map(t => (
                   <Badge key={t} variant={t === "Normal" ? "outline" : "default"} className="text-xs font-normal">
                     {t}
                   </Badge>
                 ))}
               </div>
             </CardContent>
           </Card>
        ))}
      </div>
      
      {pokemon.length === 0 && (
         <div className="w-full py-12 text-center text-muted-foreground">
           No Pokémon found matching your search.
         </div>
      )}
    </div>
  );
}
