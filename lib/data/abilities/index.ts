/**
 * Ability mapping utilities and exports
 */

import { abilityMappings } from "./mappings";
import { AbilityMapping } from "../../types/mappings";

export { abilityMappings };

/**
 * Get ability mapping by game ID
 */
export function getAbilityMappingByGameId(gameId: string): AbilityMapping | undefined {
  return Object.values(abilityMappings).find((mapping) => mapping.gameId === gameId);
}

/**
 * Get ability mapping by custom ID
 */
export function getAbilityMappingByCustomId(customId: string): AbilityMapping | undefined {
  return abilityMappings[customId];
}

/**
 * Get all ability game IDs
 */
export function getAllAbilityGameIds(): string[] {
  return Object.values(abilityMappings).map((mapping) => mapping.gameId);
}

