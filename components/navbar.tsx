import Link from 'next/link';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold sm:inline-block">PokéFusion Web</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/generator" className="text-sm font-medium transition-colors hover:text-primary">
              Generator
            </Link>
            <Link href="/dex" className="text-sm font-medium transition-colors hover:text-primary">
              Fusion Dex
            </Link>
            <Link href="/favorites" className="text-sm font-medium transition-colors hover:text-primary">
              Favorites
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href="/generator">Start Fusing</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
