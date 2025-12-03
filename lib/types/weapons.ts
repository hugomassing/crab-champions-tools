/**
 * Normalized weapon types for frontend use
 */

export type WeaponRarity = "Common" | "Greed" | "Epic" | "Legendary" | "Relic";
export type CrosshairType = "Dot" | "Cross" | "Circle";
export type FormationType = "Single" | "SmallArc" | "LargeArc" | "Line" | "Spread";

export interface WeaponStats {
  fireRate?: number;
  clipSize: number;
  reloadDuration: number;
  baseSpread?: number;
  maxSpread?: number;
  spreadRecovery?: number;
  aimingSpreadMultiplier?: number;
  verticalRecoil?: number;
  horizontalRecoil?: number;
  recoilInterpSpeed?: number;
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
  formationSpacing?: number;
  formationExpansionDampening?: number;
  projectileId?: string;
  requiresUnlock: boolean;
  iconPath?: string;
  tintColor?: string;
}

export type WeaponsData = Weapon[];

