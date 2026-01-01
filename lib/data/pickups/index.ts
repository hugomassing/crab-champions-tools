/**
 * Pickup mapping utilities and exports
 */

import { pickupMappings } from "./mappings";
import { PickupMapping } from "../../types/mappings";

export { pickupMappings };

/**
 * Get pickup mapping by game ID
 */
export function getPickupMappingByGameId(gameId: string): PickupMapping | undefined {
  return Object.values(pickupMappings).find((mapping) => mapping.gameId === gameId);
}

/**
 * Get pickup mapping by custom ID
 */
export function getPickupMappingByCustomId(customId: string): PickupMapping | undefined {
  return pickupMappings[customId];
}

/**
 * Get all pickup game IDs
 */
export function getAllPickupGameIds(): string[] {
  return Object.values(pickupMappings).map((mapping) => mapping.gameId);
}

