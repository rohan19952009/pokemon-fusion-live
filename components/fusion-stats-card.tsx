import { Fusion } from '@/types';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

function StatBar({ label, value, max = 255 }: { label: string, value: number, max?: number }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="w-12 font-medium text-muted-foreground">{label}</span>
      <span className="w-8 text-right font-semibold">{value}</span>
      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function FusionStatsCard({ fusion }: { fusion: Fusion | null }) {
  if (!fusion) return null;

  const totalStats = Object.values(fusion.stats).reduce((a, b) => a + b, 0);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs defaultValue="stats">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="matchups">Matchups</TabsTrigger>
            <TabsTrigger value="abilities">Abilities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="matchups" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="abilities" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              The fused Pokémon may have one of the following abilities:
            </p>
            <ul className="space-y-2">
              {fusion.abilities.map(ab => (
                <li key={ab} className="px-3 py-2 bg-muted rounded-md text-sm font-medium">
                  {ab}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
