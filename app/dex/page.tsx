"use client";

import { useEffect, useState } from 'react';
import { Pokemon } from '@/types';
import { POKEMON_DB } from '@/lib/data/pokemon';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

const ALL_TYPES = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 
  'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];

export default function DexPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>(POKEMON_DB);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    let filtered = POKEMON_DB;
    
    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.id.toString() === search
      );
    }
    
    if (selectedType) {
      filtered = filtered.filter(p => p.types.includes(selectedType));
    }
    
    setPokemon(filtered);
  }, [search, selectedType]);

  return (
    <div className="container py-12 max-w-7xl space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
         <h1 className="text-4xl font-extrabold tracking-tight">Super Pokédex</h1>
         <p className="text-muted-foreground max-w-2xl">
           Browse the expanded Infinite database. Filter by typing and analyze base stats.
         </p>
         
         <div className="w-full max-w-2xl space-y-4">
           <Input 
             placeholder="Search Pokémon by name or ID..." 
             className="w-full text-lg p-6 bg-card"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
           
           <ScrollArea className="w-full whitespace-nowrap pb-4">
             <div className="flex w-max space-x-2 p-1">
               <Badge 
                 variant={!selectedType ? "default" : "outline"}
                 className="cursor-pointer text-sm py-1 px-3"
                 onClick={() => setSelectedType(null)}
               >
                 All
               </Badge>
               {ALL_TYPES.map(t => (
                 <Badge 
                   key={t}
                   variant={selectedType === t ? "default" : "outline"}
                   className="cursor-pointer text-sm py-1 px-3 font-medium"
                   onClick={() => setSelectedType(t)}
                 >
                   {t}
                 </Badge>
               ))}
             </div>
           </ScrollArea>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pokemon.map(p => (
           <Card key={p.id} className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all bg-card/50 border shadow-sm">
             <CardContent className="p-4 flex flex-col items-center cursor-pointer relative group">
               <span className="absolute top-3 left-3 text-xs font-bold text-muted-foreground/50">
                 #{p.id.toString().padStart(3, '0')}
               </span>
               <div className="relative w-28 h-28 mb-4 mt-2 transition-transform group-hover:scale-110 duration-500">
                 <Image src={p.spriteUrls.front_default} alt={p.name} fill className="object-contain drop-shadow-md" unoptimized />
               </div>
               <h3 className="font-bold text-lg mb-2">{p.name}</h3>
               <div className="flex gap-1.5 mb-4">
                 {p.types.map(t => (
                   <Badge key={t} variant={t === "Normal" ? "outline" : "default"} className="text-[10px] uppercase font-bold tracking-wider">
                     {t}
                   </Badge>
                 ))}
               </div>
               
               <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                 <div className="flex justify-between"><span>HP</span><span className="font-medium text-foreground">{p.stats.hp}</span></div>
                 <div className="flex justify-between"><span>ATK</span><span className="font-medium text-foreground">{p.stats.attack}</span></div>
                 <div className="flex justify-between"><span>DEF</span><span className="font-medium text-foreground">{p.stats.defense}</span></div>
                 <div className="flex justify-between"><span>SPD</span><span className="font-medium text-foreground">{p.stats.speed}</span></div>
               </div>
             </CardContent>
           </Card>
        ))}
      </div>
      
      {pokemon.length === 0 && (
         <div className="w-full py-20 text-center flex flex-col items-center opacity-50">
           <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201.png" alt="Unown" width={96} height={96} className="mb-4 grayscale" unoptimized />
           <p className="text-xl font-medium">No Pokémon found matching your criteria.</p>
         </div>
      )}
    </div>
  );
}
