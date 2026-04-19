import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Fusion } from '@/types';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

export function FusionPreview({ fusion, loading }: { fusion: Fusion | null, loading: boolean }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [fusion?.spriteUrl]);
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border rounded-xl bg-card/50 h-[400px]">
        <Skeleton className="w-64 h-64 rounded-full mb-6" />
        <Skeleton className="w-48 h-8 mb-2" />
        <Skeleton className="w-24 h-6" />
      </div>
    );
  }

  if (!fusion) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border rounded-xl bg-card/50 border-dashed h-[400px]">
        <p className="text-muted-foreground text-center font-medium">Select a Head and Body Pokémon to generate a fusion.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 border rounded-xl bg-card shadow-sm h-[400px] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-primary to-transparent" />
      
      <div className="relative w-64 h-64 mb-6 z-10 transition-transform hover:scale-105 duration-300">
        {!imgError ? (
          <Image 
            src={fusion.spriteUrl} 
            alt={fusion.fusionName} 
            fill 
            className="object-contain drop-shadow-2xl" 
            unoptimized 
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center opacity-50 bg-black/5 dark:bg-white/5 rounded-2xl">
            <Image 
               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fusion.bodyId}.png`}
               alt="Fallback Silhouette"
               fill
               className="object-contain p-8 brightness-0 drop-shadow-md"
               unoptimized
            />
            <span className="absolute bottom-2 text-xs font-bold uppercase tracking-widest text-muted-foreground border bg-background/80 px-2 py-1 rounded">No Custom Sprite</span>
          </div>
        )}
      </div>
      
      <h2 className="text-3xl font-extrabold tracking-tight z-10 mb-3">{fusion.fusionName}</h2>
      
      <div className="flex gap-2 z-10">
        <Badge variant="default" className="text-sm px-3 py-1 capitalize">
          {fusion.type1}
        </Badge>
        {fusion.type2 && (
          <Badge variant="outline" className="text-sm px-3 py-1 capitalize border-primary text-primary">
            {fusion.type2}
          </Badge>
        )}
      </div>
    </div>
  );
}
