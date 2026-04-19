import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-4xl space-y-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">About PokéFusion</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 leading-relaxed text-muted-foreground">
          <p>
            The generator uses a custom rule-engine to calculate the results of fusing two Pokémon. 
            The <strong>Head</strong> or Base Pokémon determines the core silhouette and primary typing. 
            The <strong>Body</strong> or Secondary Pokémon influences the bulk of the final stats and provides the secondary typing.
          </p>
          <p>
            If a hand-crafted sprite from a fan artist exists for the specific combination, our system will 
            serve it via the Custom Sprite mode. Otherwise, the engine attempts an automated layered fallback to visualize the fusion.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legal Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 leading-relaxed text-muted-foreground text-sm">
          <p>
            This website is a completely <strong>fan-made project</strong> designed for educational purposes and community fun. 
            It is <strong>not affiliated with, endorsed by, sponsorships of, or in any way officially connected to Nintendo, Game Freak, or The Pokémon Company.</strong>
          </p>
          <p>
            All Pokémon names, related names, images, and content are trademarks and copyrights of Nintendo, Game Freak, and The Pokémon Company.
            The artwork used consists of official sprites intended under fair use for transformative parody/tools, as well as community-created fan art distributed with credit.
          </p>
          <p>
            If you are the creator of a custom sprite and wish for it to be removed, or if you want to contribute, please reach out via our GitHub repository.
          </p>
        </CardContent>
      </Card>
      
      <Card>
         <CardHeader>
             <CardTitle>Open Source Architecture</CardTitle>
         </CardHeader>
         <CardContent className="text-muted-foreground leading-relaxed">
             This application is entirely open source, built with Next.js 14, Tailwind CSS, Zustand, and Cloudflare Pages. 
         </CardContent>
      </Card>

    </div>
  );
}
