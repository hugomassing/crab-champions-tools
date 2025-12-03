/**
 * Public API for game data access
 */

export {
  loadAbilities,
  loadWeapons,
  loadAbilitiesSync,
  loadWeaponsSync,
  loadAbility,
  loadWeapon,
  loadAbilitySync,
  loadWeaponSync,
} from "./loaders";

export type { Ability, AbilitiesData, AbilityRarity } from "../types/abilities";
export type {
  Weapon,
  WeaponsData,
  WeaponRarity,
  WeaponStats,
} from "../types/weapons";

/**
 * Filter abilities by rarity
 */
export async function getAbilitiesByRarity(
  rarity: AbilityRarity
): Promise<Ability[]> {
  const { loadAbilities } = await import("./loaders");
  const abilities = await loadAbilities();
  return abilities.filter((ability) => ability.rarity === rarity);
}

/**
 * Filter weapons by rarity
 */
export async function getWeaponsByRarity(rarity: WeaponRarity): Promise<Weapon[]> {
  const { loadWeapons } = await import("./loaders");
  const weapons = await loadWeapons();
  return weapons.filter((weapon) => weapon.rarity === rarity);
}

/**
 * Find ability by ID (uses optimized single-file loading)
 */
export async function getAbilityById(id: string): Promise<Ability | undefined> {
  const { loadAbility } = await import("./loaders");
  return loadAbility(id);
}

/**
 * Find weapon by ID (uses optimized single-file loading)
 */
export async function getWeaponById(id: string): Promise<Weapon | undefined> {
  const { loadWeapon } = await import("./loaders");
  return loadWeapon(id);
}

/**
 * Search abilities by name (case-insensitive)
 */
export async function searchAbilities(query: string): Promise<Ability[]> {
  const { loadAbilities } = await import("./loaders");
  const abilities = await loadAbilities();
  const lowerQuery = query.toLowerCase();
  return abilities.filter(
    (ability) =>
      ability.name.toLowerCase().includes(lowerQuery) ||
      ability.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Search weapons by name (case-insensitive)
 */
export async function searchWeapons(query: string): Promise<Weapon[]> {
  const { loadWeapons } = await import("./loaders");
  const weapons = await loadWeapons();
  const lowerQuery = query.toLowerCase();
  return weapons.filter(
    (weapon) =>
      weapon.name.toLowerCase().includes(lowerQuery) ||
      weapon.description.toLowerCase().includes(lowerQuery)
  );
}

