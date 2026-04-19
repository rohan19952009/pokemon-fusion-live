import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left max-w-2xl">
          <strong>Disclaimer:</strong> This is a fan-made project and is not affiliated with, 
          endorsed by, or sponsored by Nintendo, Game Freak, or The Pokémon Company.
          All Pokémon images and assets belong to their respective owners.
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
