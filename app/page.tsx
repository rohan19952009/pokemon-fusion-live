import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-indigo-950 to-background flex flex-col items-center border-b">
        <div className="container px-4 md:px-6 space-y-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Create Infinite Possibilities
          </h1>
          <p className="max-w-[700px] mx-auto text-xl text-muted-foreground">
            Fuse your favorite Pokémon together. Discover new typings, stats, and custom sprites in this fan-made generator.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="h-12 px-8">
              <Link href="/generator">Go to Generator</Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8">
              <Link href="/dex">Browse Dex</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full py-12 md:py-24 max-w-6xl container px-4 space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Use Our Generator?</h2>
          <p className="mt-4 text-muted-foreground">Built for fans, by fans, providing the smoothest fusion experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Directional Fusions</CardTitle>
              <CardDescription>Head + Body matters.</CardDescription>
            </CardHeader>
            <CardContent>
              The order of your fusion dictates the stats, typing, and overall resulting sprite.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Custom Sprite Support</CardTitle>
              <CardDescription>Community driven art.</CardDescription>
            </CardHeader>
            <CardContent>
              If a custom hand-drawn sprite exists, we use it! Hand-crafted by talented fan artists.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Deep Stat Engine</CardTitle>
              <CardDescription>Competitive ready data.</CardDescription>
            </CardHeader>
            <CardContent>
              We calculate base stats, merged abilities, and calculate the perfect type matchups.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mini Quick Generator Widget Callout */}
      <section className="w-full py-24 bg-muted/50 border-t flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to experiment?</h2>
        <Button size="lg" variant="default" className="text-lg">
           <Link href="/generator">Start Mixing Now</Link>
        </Button>
      </section>

    </div>
  );
}
