/**
 * Normalized ability types for frontend use
 */

export type AbilityRarity = "Common" | "Greed" | "Epic" | "Legendary" | "Relic";
export type HitmarkerType = "Quiet" | "Loud";
export type AbilitySpawnType = "AboveCrosshair" | "AtCrosshair" | "AtFeet";

export interface Ability {
  id: string;
  gameId?: string;
  name: string;
  description: string;
  rarity: AbilityRarity;
  cooldown: number;
  spawnType?: AbilitySpawnType;
  spawnDelay?: number;
  hitmarkerType?: HitmarkerType;
  projectileId?: string;
  requiresUnlock: boolean;
  iconPath?: string;
}

export type AbilitiesData = Ability[];

