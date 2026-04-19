"use client";

import { useState, useEffect } from 'react';
import { Pokemon } from '@/types';
import { POKEMON_DB, searchPokemon } from '@/lib/data/pokemon';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Search, X, Repeat } from 'lucide-react';
import Image from 'next/image';

interface PokemonModalSelectorProps {
  label: string;
  selected: Pokemon | null;
  onSelect: (p: Pokemon | null) => void;
}

export function PokemonModalSelector({ label, selected, onSelect }: PokemonModalSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Pokemon[]>([]);

  // When modal is open, reset search and load defaults
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults(POKEMON_DB.slice(0, 100)); // Load standard 100 initially
      document.body.style.overflow = 'hidden'; // Prevent page scroll
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isOpen]);

  // Handle queries
  useEffect(() => {
    if (!isOpen) return;
    if (!query) {
      setResults(POKEMON_DB.slice(0, 100));
      return;
    }
    setResults(searchPokemon(query));
  }, [query, isOpen]);

  return (
    <>
      {/* TRIGGER CARD */}
      <div className="flex flex-col items-center gap-2 w-full max-w-[200px]">
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-full aspect-square rounded-xl border-2 border-muted bg-card hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center p-4 group overflow-hidden shadow-sm hover:shadow-md"
        >
          {selected ? (
            <>
              <div className="relative w-32 h-32 transform group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src={selected.spriteUrls.front_default} 
                  alt={selected.name} 
                  fill 
                  className="object-contain" 
                  unoptimized // Crucial for pixel art crispness from remote URLs
                />
              </div>
              <div className="absolute bottom-3 text-center w-full z-10 bg-background/80 backdrop-blur-sm py-1 border-y">
                <span className="text-xs text-muted-foreground font-mono">#{selected.id.toString().padStart(3, '0')}</span>
                <p className="font-bold text-sm truncate px-2">{selected.name}</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground opacity-50">
              <Search className="w-12 h-12 mb-2" />
              <span className="text-sm font-semibold">Select</span>
            </div>
          )}
        </div>
        
        {/* Helper Action Button below card (like "Change" button in Infinite Fusion) */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full h-8 text-xs font-semibold"
          onClick={() => setIsOpen(true)}
        >
          Change <Repeat className="w-3 h-3 ml-2" />
        </Button>
      </div>

      {/* FULLSCREEN MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          
          <div className="relative w-full max-w-2xl h-[85vh] max-h-[800px] bg-background border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-card">
              <h2 className="text-lg font-bold">Choose {label}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-4 border-b bg-muted/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  autoFocus
                  placeholder="Search by name or ID..."
                  className="pl-10 h-12 text-lg shadow-sm bg-background border-2 focus-visible:ring-primary"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Grid content */}
            <ScrollArea className="flex-1 p-4">
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p>No Pokémon found</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {results.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        onSelect(p);
                        setIsOpen(false);
                      }}
                      className="group flex flex-col items-center justify-between p-2 border rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-all bg-card shadow-sm hover:shadow-md"
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 transform group-hover:scale-110 transition-transform">
                        <Image 
                          src={p.spriteUrls.front_default} 
                          alt={p.name} 
                          fill 
                          className="object-contain drop-shadow-sm"
                          unoptimized
                        />
                      </div>
                      <div className="text-center w-full">
                        <p className="text-[10px] text-muted-foreground font-mono">#{p.id.toString().padStart(3, '0')}</p>
                        <p className="text-xs sm:text-sm font-semibold truncate w-full">{p.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}
