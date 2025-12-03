/**
 * Data loading utilities for frontend
 */

import * as fs from "fs";
import * as path from "path";
import { AbilitiesData, Ability } from "../types/abilities";
import { WeaponsData, Weapon } from "../types/weapons";

const DATA_DIR = path.join(process.cwd(), "lib", "data");

/**
 * Merge custom data with generated data
 */
function mergeCustomData<T extends { id: string }>(
  generated: T,
  customDataPath: string
): T {
  try {
    if (fs.existsSync(customDataPath)) {
      const customData = JSON.parse(
        fs.readFileSync(customDataPath, "utf-8")
      ) as Partial<T>;
      return { ...generated, ...customData };
    }
  } catch (error) {
    console.warn(`Failed to load custom data from ${customDataPath}:`, error);
  }
  return generated;
}

/**
 * Load all weapons from generated files and merge with custom data
 */
export function loadWeaponsSync(): WeaponsData {
  try {
    const generatedDir = path.join(DATA_DIR, "weapons", "generated");
    const dataDir = path.join(DATA_DIR, "weapons", "data");

    if (!fs.existsSync(generatedDir)) {
      throw new Error(`Weapons generated directory not found: ${generatedDir}`);
    }

    const files = fs.readdirSync(generatedDir).filter((file) =>
      file.endsWith(".json")
    );

    const weapons: Weapon[] = [];

    for (const file of files) {
      const generatedPath = path.join(generatedDir, file);
      const customDataPath = path.join(dataDir, file);

      const generated = JSON.parse(
        fs.readFileSync(generatedPath, "utf-8")
      ) as Weapon;

      const merged = mergeCustomData(generated, customDataPath);
      weapons.push(merged);
    }

    weapons.sort((a, b) => {
      const rarityOrder: Record<string, number> = {
        Common: 0,
        Greed: 1,
        Epic: 2,
        Legendary: 3,
        Relic: 4,
      };
      const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
      if (rarityDiff !== 0) return rarityDiff;
      return a.name.localeCompare(b.name);
    });

    return weapons;
  } catch (error) {
    console.error("Failed to load weapons data:", error);
    throw new Error("Unable to load weapons data");
  }
}

/**
 * Load all abilities from generated files and merge with custom data
 */
export function loadAbilitiesSync(): AbilitiesData {
  try {
    const generatedDir = path.join(DATA_DIR, "abilities", "generated");
    const dataDir = path.join(DATA_DIR, "abilities", "data");

    if (!fs.existsSync(generatedDir)) {
      throw new Error(
        `Abilities generated directory not found: ${generatedDir}`
      );
    }

    const files = fs.readdirSync(generatedDir).filter((file) =>
      file.endsWith(".json")
    );

    const abilities: Ability[] = [];

    for (const file of files) {
      const generatedPath = path.join(generatedDir, file);
      const customDataPath = path.join(dataDir, file);

      const generated = JSON.parse(
        fs.readFileSync(generatedPath, "utf-8")
      ) as Ability;

      const merged = mergeCustomData(generated, customDataPath);
      abilities.push(merged);
    }

    abilities.sort((a, b) => {
      const rarityOrder: Record<string, number> = {
        Common: 0,
        Greed: 1,
        Epic: 2,
        Legendary: 3,
        Relic: 4,
      };
      const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
      if (rarityDiff !== 0) return rarityDiff;
      return a.name.localeCompare(b.name);
    });

    return abilities;
  } catch (error) {
    console.error("Failed to load abilities data:", error);
    throw new Error("Unable to load abilities data");
  }
}

/**
 * Load a single weapon by ID
 */
export function loadWeaponSync(id: string): Weapon | undefined {
  try {
    const generatedPath = path.join(
      DATA_DIR,
      "weapons",
      "generated",
      `${id}.json`
    );
    const customDataPath = path.join(DATA_DIR, "weapons", "data", `${id}.json`);

    if (!fs.existsSync(generatedPath)) {
      return undefined;
    }

    const generated = JSON.parse(
      fs.readFileSync(generatedPath, "utf-8")
    ) as Weapon;

    return mergeCustomData(generated, customDataPath);
  } catch (error) {
    console.error(`Failed to load weapon ${id}:`, error);
    return undefined;
  }
}

/**
 * Load a single ability by ID
 */
export function loadAbilitySync(id: string): Ability | undefined {
  try {
    const generatedPath = path.join(
      DATA_DIR,
      "abilities",
      "generated",
      `${id}.json`
    );
    const customDataPath = path.join(
      DATA_DIR,
      "abilities",
      "data",
      `${id}.json`
    );

    if (!fs.existsSync(generatedPath)) {
      return undefined;
    }

    const generated = JSON.parse(
      fs.readFileSync(generatedPath, "utf-8")
    ) as Ability;

    return mergeCustomData(generated, customDataPath);
  } catch (error) {
    console.error(`Failed to load ability ${id}:`, error);
    return undefined;
  }
}

/**
 * Async versions (for client components) - use sync versions wrapped in Promise
 * In a real Next.js app, you might want to create API routes or use a different strategy
 */
export async function loadWeapons(): Promise<WeaponsData> {
  return Promise.resolve(loadWeaponsSync());
}

export async function loadAbilities(): Promise<AbilitiesData> {
  return Promise.resolve(loadAbilitiesSync());
}

export async function loadWeapon(id: string): Promise<Weapon | undefined> {
  return Promise.resolve(loadWeaponSync(id));
}

export async function loadAbility(id: string): Promise<Ability | undefined> {
  return Promise.resolve(loadAbilitySync(id));
}
