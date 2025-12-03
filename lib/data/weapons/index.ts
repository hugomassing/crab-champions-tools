/**
 * Weapon mapping utilities and exports
 */

import { weaponMappings } from "./mappings";
import { WeaponMapping } from "../../types/mappings";

export { weaponMappings };

/**
 * Get weapon mapping by game ID
 */
export function getWeaponMappingByGameId(gameId: string): WeaponMapping | undefined {
  return Object.values(weaponMappings).find((mapping) => mapping.gameId === gameId);
}

/**
 * Get weapon mapping by custom ID
 */
export function getWeaponMappingByCustomId(customId: string): WeaponMapping | undefined {
  return weaponMappings[customId];
}

/**
 * Get all weapon game IDs
 */
export function getAllWeaponGameIds(): string[] {
  return Object.values(weaponMappings).map((mapping) => mapping.gameId);
}

