import { useState } from 'react';
import { Fusion } from '@/types';
import { Separator } from './ui/separator';

function StatBar({ label, value, max = 255 }: { label: string, value: number, max?: number }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="w-12 font-medium text-muted-foreground">{label}</span>
      <span className="w-8 text-right font-semibold">{value}</span>
      <div className="flex-1 h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
        <div 
          className="h-full bg-zinc-800 dark:bg-zinc-300 transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function FusionStatsCard({ fusion }: { fusion: Fusion | null }) {
  const [activeTab, setActiveTab] = useState<'stats' | 'matchups' | 'abilities'>('stats');

  if (!fusion) return null;

  const totalStats = Object.values(fusion.stats).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full border rounded-xl bg-card shadow-sm overflow-hidden">
      <div className="p-6">
        {/* Custom Tabs List */}
        <div className="flex w-full items-center justify-center rounded-lg bg-muted p-1 mb-6">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'stats' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50'}`}
          >
            Stats
          </button>
          <button 
            onClick={() => setActiveTab('matchups')}
            className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'matchups' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50'}`}
          >
            Matchups
          </button>
          <button 
            onClick={() => setActiveTab('abilities')}
            className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'abilities' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50'}`}
          >
            Abilities
          </button>
        </div>
        
        {/* Content Panels */}
        {activeTab === 'stats' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <StatBar label="HP" value={fusion.stats.hp} />
            <StatBar label="ATK" value={fusion.stats.attack} />
            <StatBar label="DEF" value={fusion.stats.defense} />
            <StatBar label="SPA" value={fusion.stats.specialAttack} />
            <StatBar label="SPD" value={fusion.stats.specialDefense} />
            <StatBar label="SPE" value={fusion.stats.speed} />
            <Separator />
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-muted-foreground">Total Base Stats</span>
              <span>{totalStats}</span>
            </div>
          </div>
        )}
        
        {activeTab === 'matchups' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div>
              <h4 className="text-sm font-semibold mb-2">Weaknesses (2x)</h4>
              <div className="flex flex-wrap gap-2">
                {fusion.weaknesses.length > 0 ? fusion.weaknesses.map(w => (
                  <span key={w} className="px-2 py-1 bg-red-500/10 text-red-500 rounded text-xs font-medium uppercase tracking-wider">{w}</span>
                )) : <span className="text-xs text-muted-foreground">None</span>}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Resistances (0.5x)</h4>
              <div className="flex flex-wrap gap-2">
                {fusion.resistances.length > 0 ? fusion.resistances.map(r => (
                  <span key={r} className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium uppercase tracking-wider">{r}</span>
                )) : <span className="text-xs text-muted-foreground">None</span>}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'abilities' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className="text-sm text-muted-foreground mb-4">
              The fused Pokémon may have one of the following abilities:
            </p>
            <ul className="space-y-2">
              {fusion.abilities.map(ab => (
                <li key={ab} className="px-3 py-2 bg-muted rounded-md text-sm font-medium capitalize">
                  {ab}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
