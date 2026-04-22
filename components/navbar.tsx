"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <Link href="/cheats" className="text-sm font-medium transition-colors hover:text-primary">
              Cheats
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 flex flex-col space-y-4 animate-in slide-in-from-top-2">
          <Link href="/generator" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium transition-colors hover:text-primary">
            Generator
          </Link>
          <Link href="/dex" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium transition-colors hover:text-primary">
            Fusion Dex
          </Link>
          <Link href="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium transition-colors hover:text-primary">
            Favorites
          </Link>
          <Link href="/cheats" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium transition-colors hover:text-primary">
            Cheats
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Button className="w-full mt-2" onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/generator" className="w-full">Start Fusing</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
