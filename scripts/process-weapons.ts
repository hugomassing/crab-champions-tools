/**
 * Process weapon JSON files and generate normalized per-entity JSON files
 */

import * as path from "path";
import * as fs from "fs";
import {
  PATHS,
  getFiles,
  getDirectories,
  readJSON,
  writeJSON,
  ensureDirectory,
} from "./utils";
import { RawWeaponData } from "../lib/types/game-data";
import { Weapon, WeaponStats } from "../lib/types/weapons";
import {
  validateWeaponData,
  validateRarity,
  validateCrosshairType,
  validateFormationType,
  extractAssetName,
  extractProjectileId,
  hexToRgb,
} from "./validate";
import { getWeaponMappingByGameId } from "../lib/data/weapons/index";

const WEAPONS_DIR = path.join(PATHS.gameAssets, "Content", "Blueprint", "Weapon");
const OUTPUT_DIR = path.join(PATHS.output, "weapons", "generated");

/**
 * Normalize a raw weapon data object to web-friendly format
 */
function normalizeWeapon(raw: RawWeaponData, fileName: string): Weapon {
  validateWeaponData(raw, fileName);

  const gameId = raw.Name;
  const mapping = getWeaponMappingByGameId(gameId);

  if (!mapping) {
    throw new Error(`No mapping found for game ID: ${gameId}`);
  }

  const id = mapping.customId;
  const rarity = validateRarity(raw.Properties.Rarity, fileName);
  const crosshairType = validateCrosshairType(raw.Properties.CrosshairType);
  const formationType = validateFormationType(raw.Properties.FormationType);
  const projectileId = extractProjectileId(raw.Properties.ProjectileDA);
  const iconPath = extractAssetName(raw.Properties.Icon?.ObjectPath);
  const tintColor = raw.Properties.Tint?.Hex
    ? hexToRgb(raw.Properties.Tint.Hex)
    : undefined;

  const stats: WeaponStats = {
    fireRate: raw.Properties.BaseFireRate,
    clipSize: raw.Properties.BaseClipSize ?? 0,
    reloadDuration: raw.Properties.ReloadDuration ?? 0,
    baseSpread: raw.Properties.BaseSpread,
    maxSpread: raw.Properties.MaxSpread,
    spreadRecovery: raw.Properties.SpreadRecovery,
    aimingSpreadMultiplier: raw.Properties.AimingSpreadMultiplier,
    verticalRecoil: raw.Properties.VerticalRecoil,
    horizontalRecoil: raw.Properties.HorizontalRecoil,
    recoilInterpSpeed: raw.Properties.RecoilInterpSpeed,
  };

  return {
    id,
    gameId,
    name: raw.Properties.Name,
    description: raw.Properties.Description,
    rarity,
    stats,
    crosshairType,
    formationType,
    formationSpacing: raw.Properties.FormationSpacing,
    formationExpansionDampening: raw.Properties.FormationExpansionDampening,
    projectileId,
    requiresUnlock: raw.Properties.bRequiresUnlock ?? false,
    iconPath,
    tintColor,
  };
}

/**
 * Find all weapon JSON files in subdirectories
 */
function findWeaponFiles(baseDir: string): string[] {
  const weaponFiles: string[] = [];
  const subdirs = getDirectories(baseDir);

  for (const subdir of subdirs) {
    const subdirPath = path.join(baseDir, subdir);
    const files = getFiles(subdirPath).filter(
      (file) => file.startsWith("DA_Weapon_") && file.endsWith(".json")
    );

    for (const file of files) {
      weaponFiles.push(path.join(subdirPath, file));
    }
  }

  return weaponFiles;
}

/**
 * Process all weapon files
 */
async function processWeapons() {
  try {
    console.log("Processing weapons...");
    console.log(`Reading from: ${WEAPONS_DIR}`);

    ensureDirectory(PATHS.output);

    if (!fs.existsSync(WEAPONS_DIR)) {
      throw new Error(`Weapons directory not found: ${WEAPONS_DIR}`);
    }

    const weaponFiles = findWeaponFiles(WEAPONS_DIR);

    if (weaponFiles.length === 0) {
      throw new Error(`No weapon JSON files found in ${WEAPONS_DIR}`);
    }

    console.log(`Found ${weaponFiles.length} weapon files`);

    ensureDirectory(OUTPUT_DIR);

    const processed: string[] = [];
    const errors: string[] = [];

    for (const filePath of weaponFiles) {
      try {
        const fileName = path.basename(filePath);
        const rawData = readJSON<RawWeaponData[]>(filePath);

        if (!Array.isArray(rawData) || rawData.length === 0) {
          throw new Error(`Invalid format: expected non-empty array`);
        }

        const rawWeapon = rawData[0];
        const normalized = normalizeWeapon(rawWeapon, fileName);

        const outputFile = path.join(OUTPUT_DIR, `${normalized.id}.json`);
        writeJSON(outputFile, normalized);
        processed.push(normalized.id);
      } catch (error) {
        const errorMsg = `Error processing ${filePath}: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    if (processed.length === 0) {
      throw new Error("No weapons were successfully processed");
    }

    processed.sort();

    console.log(`\n✓ Successfully processed ${processed.length} weapons`);
    console.log(`✓ Output written to: ${OUTPUT_DIR}`);
    console.log(`✓ Files created: ${processed.join(", ")}`);

    if (errors.length > 0) {
      console.warn(`\n⚠ ${errors.length} file(s) had errors:`);
      errors.forEach((err) => console.warn(`  - ${err}`));
    }
  } catch (error) {
    console.error("Fatal error processing weapons:", error);
    process.exit(1);
  }
}

processWeapons();

