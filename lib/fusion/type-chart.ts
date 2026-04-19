const typeMatchups: Record<string, Record<string, number>> = {
  Normal: { Fighting: 2, Ghost: 0 },
  Fire: { Fire: 0.5, Water: 2, Grass: 0.5, Ice: 0.5, Ground: 2, Bug: 0.5, Rock: 2, Steel: 0.5, Fairy: 0.5 },
  Water: { Fire: 0.5, Water: 0.5, Electric: 2, Grass: 2, Ice: 0.5, Steel: 0.5 },
  Electric: { Electric: 0.5, Ground: 2, Flying: 0.5, Steel: 0.5 },
  Grass: { Fire: 2, Water: 0.5, Grass: 0.5, Electric: 0.5, Ice: 2, Poison: 2, Ground: 0.5, Flying: 2, Bug: 2 },
  Ice: { Fire: 2, Ice: 0.5, Fighting: 2, Rock: 2, Steel: 2 },
  Fighting: { Flying: 2, Psychic: 2, Bug: 0.5, Rock: 0.5, Dark: 0.5, Fairy: 2 },
  Poison: { Grass: 0.5, Fighting: 0.5, Poison: 0.5, Ground: 2, Psychic: 2, Bug: 0.5, Fairy: 0.5 },
  Ground: { Water: 2, Electric: 0, Grass: 2, Ice: 2, Poison: 0.5, Rock: 0.5 },
  Flying: { Electric: 2, Grass: 0.5, Ice: 2, Fighting: 0.5, Ground: 0, Bug: 0.5, Rock: 2 },
  Psychic: { Fighting: 0.5, Psychic: 0.5, Bug: 2, Ghost: 2, Dark: 2 },
  Bug: { Fire: 2, Grass: 0.5, Fighting: 0.5, Ground: 0.5, Flying: 2, Rock: 2 },
  Rock: { Normal: 0.5, Fire: 0.5, Water: 2, Grass: 2, Fighting: 2, Poison: 0.5, Ground: 2, Flying: 0.5, Steel: 2 },
  Ghost: { Normal: 0, Fighting: 0, Poison: 0.5, Bug: 0.5, Ghost: 2, Dark: 2 },
  Dragon: { Fire: 0.5, Water: 0.5, Electric: 0.5, Grass: 0.5, Ice: 2, Dragon: 2, Fairy: 2 },
  Dark: { Fighting: 2, Psychic: 0, Bug: 2, Ghost: 0.5, Dark: 0.5, Fairy: 2 },
  Steel: { Normal: 0.5, Fire: 2, Water: 0.5, Grass: 0.5, Ice: 0.5, Fighting: 2, Poison: 0, Ground: 2, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 0.5, Dragon: 0.5, Steel: 0.5, Fairy: 0.5 },
  Fairy: { Fighting: 0.5, Poison: 2, Bug: 0.5, Dragon: 0, Dark: 0.5, Steel: 2 }
};

export function calculateWeaknessesAndResistances(type1: string, type2?: string): { weaknesses: string[], resistances: string[] } {
  const allTypes = Object.keys(typeMatchups);
  const multipliers: Record<string, number> = {};

  allTypes.forEach(t => multipliers[t] = 1);

  // Apply defenses for type 1
  const t1Defenses = typeMatchups[type1] || {};
  for (const [attacker, multiplier] of Object.entries(t1Defenses)) {
    multipliers[attacker] *= multiplier;
  }

  // Apply defenses for type 2 if it exists and is different
  if (type2 && type2 !== type1) {
    const t2Defenses = typeMatchups[type2] || {};
    for (const [attacker, multiplier] of Object.entries(t2Defenses)) {
      multipliers[attacker] *= multiplier;
    }
  }

  const weaknesses = [];
  const resistances = [];

  for (const [type, mult] of Object.entries(multipliers)) {
    if (mult > 1) weaknesses.push(type);
    if (mult < 1) resistances.push(type);
  }

  return { weaknesses, resistances };
}
