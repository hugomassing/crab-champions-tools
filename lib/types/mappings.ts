/**
 * Types for weapon and ability ID mappings
 */

export interface WeaponMapping {
  customId: string;
  gameId: string;
  imagePath?: string;
  metadata?: Record<string, unknown>;
}

export interface AbilityMapping {
  customId: string;
  gameId: string;
  imagePath?: string;
  metadata?: Record<string, unknown>;
}

export interface PickupMapping {
  customId: string;
  gameId: string;
  imagePath?: string;
  metadata?: Record<string, unknown>;
}

export type WeaponMappings = Record<string, WeaponMapping>;
export type AbilityMappings = Record<string, AbilityMapping>;
export type PickupMappings = Record<string, PickupMapping>;

