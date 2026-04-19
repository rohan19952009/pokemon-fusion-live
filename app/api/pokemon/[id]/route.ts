import { NextResponse } from 'next/server';
import { getPokemonById } from '@/lib/data/pokemon';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const pokemon = getPokemonById(parseInt(params.id, 10));

  if (!pokemon) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.json(pokemon);
}
