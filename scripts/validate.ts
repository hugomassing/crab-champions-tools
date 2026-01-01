/**
 * Validation utilities for game data processing
 */

import {
  RawAbilityData,
  RawWeaponData,
  RawPickupData,
  CrabRarity,
  CrabHitmarkerType,
  CrabAbilitySpawnType,
  CrabCrosshairType,
  CrabFormationType,
} from "../lib/types/game-data";
import { LootPool, PickupTag } from "../lib/types/pickups";

const VALID_RARITIES: CrabRarity[] = [
  "Common",
  "Greed",
  "Epic",
  "Legendary",
  "Relic",
];

const VALID_HITMARKER_TYPES: CrabHitmarkerType[] = ["Quiet", "Loud"];

const VALID_SPAWN_TYPES: CrabAbilitySpawnType[] = [
  "AboveCrosshair",
  "AtCrosshair",
  "AtFeet",
];

const VALID_CROSSHAIR_TYPES: CrabCrosshairType[] = ["Dot", "Cross", "Circle"];

const VALID_FORMATION_TYPES: CrabFormationType[] = [
  "Single",
  "SmallArc",
  "LargeArc",
  "Line",
  "Spread",
];

/**
 * Extract enum value from Unreal Engine format (e.g., "ECrabRarity::Greed" -> "Greed")
 */
export function extractEnumValue(enumString: string | undefined): string | undefined {
  if (!enumString) return undefined;
  const match = enumString.match(/::(\w+)$/);
  return match ? match[1] : undefined;
}

/**
 * Validate and normalize rarity
 */
export function validateRarity(
  rarity: string | undefined,
  fileName: string
): CrabRarity {
  if (!rarity) {
    throw new Error(`Missing rarity in ${fileName}`);
  }

  const normalized = extractEnumValue(rarity);
  if (!normalized) {
    throw new Error(`Invalid rarity format: ${rarity} in ${fileName}`);
  }

  if (!VALID_RARITIES.includes(normalized as CrabRarity)) {
    throw new Error(`Unknown rarity: ${normalized} in ${fileName}`);
  }

  return normalized as CrabRarity;
}

/**
 * Validate and normalize hitmarker type
 */
export function validateHitmarkerType(
  hitmarkerType: string | undefined
): "Quiet" | "Loud" | undefined {
  if (!hitmarkerType) return undefined;
  const normalized = extractEnumValue(hitmarkerType);
  if (normalized && VALID_HITMARKER_TYPES.includes(normalized as CrabHitmarkerType)) {
    return normalized as "Quiet" | "Loud";
  }
  return undefined;
}

/**
 * Validate and normalize ability spawn type
 */
export function validateAbilitySpawnType(
  spawnType: string | undefined
): "AboveCrosshair" | "AtCrosshair" | "AtFeet" | undefined {
  if (!spawnType) return undefined;
  const normalized = extractEnumValue(spawnType);
  if (normalized && VALID_SPAWN_TYPES.includes(normalized as CrabAbilitySpawnType)) {
    return normalized as "AboveCrosshair" | "AtCrosshair" | "AtFeet";
  }
  return undefined;
}

/**
 * Validate and normalize crosshair type
 */
export function validateCrosshairType(
  crosshairType: string | undefined
): "Dot" | "Cross" | "Circle" | undefined {
  if (!crosshairType) return undefined;
  const normalized = extractEnumValue(crosshairType);
  if (normalized && VALID_CROSSHAIR_TYPES.includes(normalized as CrabCrosshairType)) {
    return normalized as "Dot" | "Cross" | "Circle";
  }
  return undefined;
}

/**
 * Validate and normalize formation type
 */
export function validateFormationType(
  formationType: string | undefined
): "Single" | "SmallArc" | "LargeArc" | "Line" | "Spread" | undefined {
  if (!formationType) return undefined;
  const normalized = extractEnumValue(formationType);
  if (normalized && VALID_FORMATION_TYPES.includes(normalized as CrabFormationType)) {
    return normalized as "Single" | "SmallArc" | "LargeArc" | "Line" | "Spread";
  }
  return undefined;
}

/**
 * Extract asset name from ObjectPath (e.g., extract "T_Icon_AirStrike" from path)
 */
export function extractAssetName(objectPath: string | undefined): string | undefined {
  if (!objectPath) return undefined;
  const parts = objectPath.split("/");
  const fileName = parts[parts.length - 1];
  const nameWithoutExtension = fileName.split(".")[0];
  return nameWithoutExtension;
}

/**
 * Extract projectile ID from ProjectileDA reference
 */
export function extractProjectileId(
  projectileDA: { ObjectName?: string; ObjectPath?: string } | undefined
): string | undefined {
  if (!projectileDA?.ObjectName) return undefined;
  const match = projectileDA.ObjectName.match(/'([^']+)'/);
  return match ? match[1] : undefined;
}

/**
 * Validate and normalize fire mode
 */
export function validateFireMode(fireMode: string | undefined): string | undefined {
  if (!fireMode) return undefined;
  const normalized = extractEnumValue(fireMode);
  return normalized;
}

/**
 * Extract weapon mod ID from StartingWeaponMod
 */
export function extractWeaponModId(
  startingWeaponMod: {
    WeaponModDA?: { ObjectName?: string; ObjectPath?: string };
  } | undefined
): string | undefined {
  if (!startingWeaponMod?.WeaponModDA?.ObjectName) return undefined;
  const match = startingWeaponMod.WeaponModDA.ObjectName.match(/'([^']+)'/);
  return match ? match[1] : undefined;
}

/**
 * Validate required fields in ability data
 */
export function validateAbilityData(
  data: RawAbilityData,
  fileName: string
): void {
  if (!data.Properties.Name) {
    throw new Error(`Missing Name in ${fileName}`);
  }
  if (!data.Properties.Description) {
    throw new Error(`Missing Description in ${fileName}`);
  }
  if (!data.Properties.Icon) {
    throw new Error(`Missing Icon in ${fileName}`);
  }
  validateRarity(data.Properties.Rarity, fileName);
}

/**
 * Validate required fields in weapon data
 */
export function validateWeaponData(data: RawWeaponData, fileName: string): void {
  if (!data.Properties.Name) {
    throw new Error(`Missing Name in ${fileName}`);
  }
  if (!data.Properties.Description) {
    throw new Error(`Missing Description in ${fileName}`);
  }
  if (!data.Properties.Icon) {
    throw new Error(`Missing Icon in ${fileName}`);
  }
  if (data.Properties.BaseClipSize === undefined) {
    throw new Error(`Missing BaseClipSize in ${fileName}`);
  }
  validateRarity(data.Properties.Rarity, fileName);
}

/**
 * Convert hex color to RGB string (e.g., "BC0000" -> "rgb(188, 0, 0)")
 */
export function hexToRgb(hex: string | undefined): string | undefined {
  if (!hex) return undefined;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

const VALID_LOOT_POOLS: LootPool[] = [
  "Damage",
  "Critical",
  "Elemental",
  "Health",
  "Regeneration",
  "Speed",
  "Skill",
  "Economy",
  "Luck",
];

const VALID_PICKUP_TAGS: PickupTag[] = [
  "Fire",
  "Ice",
  "Lightning",
  "Poison",
  "Critical",
  "None",
];

/**
 * Validate and normalize loot pool
 */
export function validateLootPool(lootPool: string | undefined): LootPool | undefined {
  if (!lootPool) return undefined;
  const normalized = extractEnumValue(lootPool);
  if (normalized && VALID_LOOT_POOLS.includes(normalized as LootPool)) {
    return normalized as LootPool;
  }
  return undefined;
}

/**
 * Validate and normalize pickup tag
 */
export function validatePickupTag(pickupTag: string | undefined): PickupTag | undefined {
  if (!pickupTag) return undefined;
  const normalized = extractEnumValue(pickupTag);
  if (normalized && VALID_PICKUP_TAGS.includes(normalized as PickupTag)) {
    return normalized as PickupTag;
  }
  return undefined;
}

/**
 * Validate required fields in pickup data
 */
export function validatePickupData(data: RawPickupData, fileName: string): void {
  if (!data.Properties.Name) {
    throw new Error(`Missing Name in ${fileName}`);
  }
  if (!data.Properties.Description) {
    throw new Error(`Missing Description in ${fileName}`);
  }
  if (!data.Properties.Icon) {
    throw new Error(`Missing Icon in ${fileName}`);
  }
  validateRarity(data.Properties.Rarity, fileName);
}

