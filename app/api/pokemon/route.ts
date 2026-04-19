import { NextResponse } from 'next/server';
import { POKEMON_DB, searchPokemon } from '@/lib/data/pokemon';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (q) {
    const results = searchPokemon(q);
    return NextResponse.json(results);
  }

  return NextResponse.json(POKEMON_DB);
}
