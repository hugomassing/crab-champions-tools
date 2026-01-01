/**
 * Normalized pickup types for frontend use
 */

export type PickupType = "AbilityMod" | "WeaponMod" | "MeleeMod" | "Perk" | "Relic" | "Consumable";
export type PickupRarity = "Common" | "Greed" | "Epic" | "Legendary" | "Relic";
export type LootPool = "Damage" | "Critical" | "Elemental" | "Health" | "Regeneration" | "Speed" | "Skill" | "Economy" | "Luck";
export type PickupTag = "Fire" | "Ice" | "Lightning" | "Poison" | "Critical" | "None";

export interface Pickup {
  id: string;
  gameId: string;
  type: PickupType;
  name: string;
  description: string;
  rarity: PickupRarity;
  lootPool?: LootPool;
  pickupTag?: PickupTag;
  spawnWeight?: number;
  levelDescription?: string;
  iconPath?: string;
  requiresUnlock: boolean;
  cooldown?: number;
  baseBuff?: number;
  getBuffAsMultiplier?: boolean;
  hyperbolicBuff?: boolean;
  baseDebuff?: number;
  getDebuffAsMultiplier?: boolean;
}

export type PickupsData = Pickup[];

