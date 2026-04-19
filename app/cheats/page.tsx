import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export const metadata = {
  title: 'Infinite Fusion Cheats | PokéFusion Web',
  description: 'Verified debug mode cheat codes and tools for Pokémon Infinite Fusion.',
};

export default function CheatsPage() {
  return (
    <div className="container py-12 max-w-5xl space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Infinite Toolkit & Cheats</h1>
        <p className="text-xl text-muted-foreground">
          Unlock Master Balls, Magic Boots, and Debug Mode in your offline ROM.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Magic Boots Section */}
        <Card className="border-primary/50 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 blur-[2px]">
            <span className="text-8xl">👢</span>
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Magic Boots (Debug Mode)</CardTitle>
              <Badge variant="destructive">Essential</Badge>
            </div>
            <CardDescription>
              The legendary Magic Boots automatically enable Debug Mode and walk-through-walls without cheat engine memory editing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 z-10 relative">
             <div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
               <span className="text-sm font-semibold">How to unlock naturally:</span>
               <p className="text-sm">Capture every single base Pokémon natively in the game and speak to the Dev NPC in Celadon City.</p>
             </div>
             
             <div className="bg-card border p-4 rounded-lg space-y-2">
               <span className="text-sm font-semibold">Cheat Engine / Kurikku String:</span>
               <div className="flex gap-2">
                 <code className="text-xs bg-muted p-2 rounded w-full font-mono text-center">00000000 00000000 00000000 0A000000</code>
               </div>
             </div>
          </CardContent>
        </Card>

        {/* Currency & Items */}
        <Card>
          <CardHeader>
            <CardTitle>Item Generation</CardTitle>
            <CardDescription>Hex codes for generating 999x items via memory editing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-3">
               
               <div className="flex justify-between items-center border-b pb-2">
                 <span className="font-semibold text-sm">Master Balls (x999)</span>
                 <code className="bg-muted px-2 py-1 rounded text-xs">82025840 0001</code>
               </div>

               <div className="flex justify-between items-center border-b pb-2">
                 <span className="font-semibold text-sm">Rare Candies (x999)</span>
                 <code className="bg-muted px-2 py-1 rounded text-xs">82025840 0044</code>
               </div>

               <div className="flex justify-between items-center border-b pb-2">
                 <span className="font-semibold text-sm">Max Money</span>
                 <code className="bg-muted px-2 py-1 rounded text-xs">82025838 104E</code>
               </div>
               
             </div>
          </CardContent>
        </Card>

      </div>

      {/* Warning */}
      <div className="mt-8 p-6 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
        <h3 className="font-bold text-destructive mb-2">Editor Warning</h3>
        <p className="text-sm text-foreground/80">
          Using memory editing cheats (via Cheat Engine or Kurikku) can corrupt your save file. Always back up your <code className="bg-background px-1 rounded">Game.rxdata</code> before forcing the Debug Menu open. These codes are not actively supported by the Infinite Fusion developer team.
        </p>
      </div>

    </div>
  );
}
