/**
 * Normalized weapon types for frontend use
 */

export type WeaponRarity = "Common" | "Greed" | "Epic" | "Legendary" | "Relic";
export type CrosshairType = "Dot" | "Cross" | "Circle";
export type FormationType = "Single" | "SmallArc" | "LargeArc" | "Line" | "Spread";

export interface WeaponStats {
  reloadDuration?: number;
  baseSpread?: number;
  maxSpread?: number;
  fireRate?: number;
  horizontalRecoil?: number;
}

export interface Weapon {
  id: string;
  gameId?: string;
  name: string;
  description: string;
  rarity: WeaponRarity;
  stats: WeaponStats;
  crosshairType?: CrosshairType;
  formationType?: FormationType;
  requiresUnlock: boolean;
  tintColor?: string;
  startingWeaponMod?: { weaponModId: string };
  dualWield?: boolean;
  fireMode?: string;
}

export type WeaponsData = Weapon[];

