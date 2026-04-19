"use client";

import { useState, useEffect } from 'react';
import { Pokemon } from '@/types';
import { searchPokemon } from '@/lib/data/pokemon';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Search, X } from 'lucide-react';
import Image from 'next/image';

interface PokemonSelectorProps {
  label: string;
  selected: Pokemon | null;
  onSelect: (p: Pokemon | null) => void;
}

export function PokemonSelector({ label, selected, onSelect }: PokemonSelectorProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setResults(searchPokemon(query));
  }, [query]);

  return (
    <div className="relative flex flex-col w-full max-w-sm gap-2">
      <label className="text-sm font-semibold text-muted-foreground">{label}</label>
      
      {selected ? (
        <div className="flex items-center justify-between p-3 border rounded-md bg-card">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-muted rounded-full overflow-hidden">
               <Image 
                 src={selected.spriteUrls.front_default} 
                 alt={selected.name} 
                 fill 
                 className="object-contain p-1 pl-2" />
            </div>
            <div>
              <p className="font-semibold">{selected.name}</p>
              <p className="text-xs text-muted-foreground">#{selected.id}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onSelect(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={`Search ${label}...`}
            className="pl-9"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          />
          
          {isOpen && results.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-card border shadow-lg rounded-md overflow-hidden">
              <ScrollArea className="max-h-64">
                {results.map((p) => (
                  <div 
                    key={p.id}
                    className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => {
                      onSelect(p);
                      setIsOpen(false);
                      setQuery('');
                    }}
                  >
                    <div className="relative w-10 h-10">
                      <Image 
                         src={p.spriteUrls.front_default} 
                         alt={p.name} 
                         fill 
                         className="object-contain" />
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                ))}
            </ScrollArea>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
