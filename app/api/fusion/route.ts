import { NextResponse } from 'next/server';
import { getPokemonById } from '@/lib/data/pokemon';
import { calculateStats, calculateTypes, generateFusionName, mergeAbilities } from '@/lib/fusion/engine';
import { calculateWeaknessesAndResistances } from '@/lib/fusion/type-chart';
import { Fusion } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const headQuery = searchParams.get('head');
  const bodyQuery = searchParams.get('body');

  if (!headQuery || !bodyQuery) {
    return new NextResponse('Missing head or body parameter', { status: 400 });
  }

  const headId = parseInt(headQuery, 10);
  const bodyId = parseInt(bodyQuery, 10);

  const head = getPokemonById(headId);
  const body = getPokemonById(bodyId);

  if (!head || !body) {
    return new NextResponse('Pokémon not found', { status: 404 });
  }

  const name = generateFusionName(head, body);
  const types = calculateTypes(head, body);
  const stats = calculateStats(head, body);
  const abilities = mergeAbilities(head, body);
  const { weaknesses, resistances } = calculateWeaknessesAndResistances(types[0], types[1]);

  // Sprite fallback mechanism (for MVP demo, assuming all auto mode or custom mock)
  const isCustomSprite = false; // We can integrate the manifest check here
  const spriteMode = isCustomSprite ? 'custom' : 'auto';
  // Use a placeholder generator service URL as fallback testing
  const spriteUrl = `https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/${headId}.${bodyId}.png`;

  const fusionResult: Fusion = {
    headId,
    bodyId,
    fusionName: name,
    type1: types[0],
    type2: types[1],
    stats,
    abilities,
    spriteMode,
    spriteUrl,
    weaknesses,
    resistances
  };

  return NextResponse.json(fusionResult);
}
