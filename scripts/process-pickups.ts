/**
 * Process pickup JSON files and generate normalized per-entity JSON files
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
  copyFile,
} from "./utils";
import { RawPickupData } from "../lib/types/game-data";
import { Pickup, PickupType } from "../lib/types/pickups";
import {
  validatePickupData,
  validateRarity,
  validateLootPool,
  validatePickupTag,
  extractAssetName,
  extractEnumValue,
} from "./validate";

const PICKUPS_DIR = path.join(PATHS.gameAssets, "Content", "Blueprint", "Pickup");
const OUTPUT_DIR = path.join(PATHS.output, "pickups", "generated");
const ICONS_BASE_DIR = path.join(PATHS.gameAssets, "Content", "UI", "Icon");
const ICONS_OUTPUT_DIR = path.join(PATHS.output, "pickups", "images");
const PUBLIC_ICONS_DIR = path.join(process.cwd(), "public", "pickups");

/**
 * Map pickup type to icon subdirectory
 */
function getIconSubdir(type: PickupType): string {
  const subdirMap: Record<PickupType, string> = {
    AbilityMod: "AbilityMod",
    WeaponMod: "WeaponMod",
    MeleeMod: "Melee",
    Perk: "Perk",
    Relic: "Relic",
    Consumable: "Consumable",
  };
  return subdirMap[type];
}

/**
 * Copy pickup icon from game assets to output directory and public folder
 */
function copyPickupIcon(iconPath: string | undefined, customId: string, type: PickupType): boolean {
  if (!iconPath) {
    return false;
  }

  const iconSubdir = getIconSubdir(type);
  
  const possiblePaths = [
    path.join(ICONS_BASE_DIR, iconSubdir, `${iconPath}.png`),
    path.join(ICONS_BASE_DIR, "GrenadeMod", `${iconPath}.png`),
    path.join(ICONS_BASE_DIR, "Enhancement", `${iconPath}.png`),
  ];

  let sourcePath: string | undefined;
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      sourcePath = possiblePath;
      break;
    }
  }

  if (!sourcePath) {
    return false;
  }

  try {
    const destPath = path.join(ICONS_OUTPUT_DIR, `${customId}.png`);
    copyFile(sourcePath, destPath);

    const publicDestPath = path.join(PUBLIC_ICONS_DIR, `${customId}.png`);
    copyFile(sourcePath, publicDestPath);

    return true;
  } catch (error) {
    console.warn(`Failed to copy icon for ${customId}: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Map pickup type from directory name or Type field
 */
function getPickupType(typeString: string, directoryName: string): PickupType {
  const typeMap: Record<string, PickupType> = {
    CrabAbilityModDA: "AbilityMod",
    CrabWeaponModDA: "WeaponMod",
    CrabMeleeModDA: "MeleeMod",
    CrabPerkDA: "Perk",
    CrabRelicDA: "Relic",
    CrabConsumableDA: "Consumable",
  };

  if (typeMap[typeString]) {
    return typeMap[typeString];
  }

  const dirMap: Record<string, PickupType> = {
    AbilityMod: "AbilityMod",
    WeaponMod: "WeaponMod",
    MeleeMod: "MeleeMod",
    Perk: "Perk",
    Relic: "Relic",
    Consumable: "Consumable",
  };

  return dirMap[directoryName] || "Perk";
}

/**
 * Extract custom ID from game ID (e.g., "DA_Perk_Banana" -> "Banana")
 */
function extractPickupId(gameId: string, type: PickupType): string {
  const prefixMap: Record<PickupType, string> = {
    AbilityMod: "DA_AbilityMod_",
    WeaponMod: "DA_WeaponMod_",
    MeleeMod: "DA_MeleeMod_",
    Perk: "DA_Perk_",
    Relic: "DA_Relic_",
    Consumable: "DA_Consumable_",
  };

  const prefix = prefixMap[type];
  if (gameId.startsWith(prefix)) {
    return gameId.substring(prefix.length);
  }

  return gameId.replace(/^DA_/, "").replace(/^[A-Z]+_/, "");
}

/**
 * Normalize a raw pickup data object to web-friendly format
 */
function normalizePickup(
  raw: RawPickupData,
  fileName: string,
  pickupType: PickupType
): Pickup {
  validatePickupData(raw, fileName);

  const gameId = raw.Name;
  const detectedType = getPickupType(raw.Type, pickupType);
  const id = extractPickupId(gameId, detectedType);
  const rarity = validateRarity(raw.Properties.Rarity, fileName);
  const lootPool = validateLootPool(raw.Properties.LootPool);
  const pickupTag = validatePickupTag(raw.Properties.PickupTag);
  const iconPath = extractAssetName(raw.Properties.Icon?.ObjectPath);

  return {
    id,
    gameId,
    type: detectedType,
    name: raw.Properties.Name,
    description: raw.Properties.Description,
    rarity,
    lootPool,
    pickupTag,
    spawnWeight: raw.Properties.SpawnWeight,
    levelDescription: raw.Properties.LevelDescription,
    iconPath,
    requiresUnlock: raw.Properties.bRequiresUnlock ?? false,
    cooldown: raw.Properties.Cooldown,
    baseBuff: raw.Properties.BaseBuff,
    getBuffAsMultiplier: raw.Properties.bGetBuffAsMultiplier ?? false,
    hyperbolicBuff: raw.Properties.bHyperbolicBuff ?? false,
    baseDebuff: raw.Properties.BaseDebuff,
    getDebuffAsMultiplier: raw.Properties.bGetDebuffAsMultiplier ?? false,
  };
}

/**
 * Find all pickup JSON files recursively in subdirectories
 */
function findPickupFiles(baseDir: string): Array<{ filePath: string; type: PickupType }> {
  const pickupFiles: Array<{ filePath: string; type: PickupType }> = [];
  const pickupTypeDirs = getDirectories(baseDir);

  for (const typeDir of pickupTypeDirs) {
    const pickupType = getPickupType("", typeDir) as PickupType;
    const typeDirPath = path.join(baseDir, typeDir);

    const rarityDirs = getDirectories(typeDirPath);
    const hasRaritySubdirs = rarityDirs.length > 0;

    if (hasRaritySubdirs) {
      for (const rarityDir of rarityDirs) {
        const rarityDirPath = path.join(typeDirPath, rarityDir);
        const files = getFiles(rarityDirPath).filter((file) =>
          file.endsWith(".json") && file.startsWith("DA_")
        );

        for (const file of files) {
          pickupFiles.push({
            filePath: path.join(rarityDirPath, file),
            type: pickupType,
          });
        }
      }
    } else {
      const files = getFiles(typeDirPath).filter(
        (file) => file.endsWith(".json") && file.startsWith("DA_")
      );

      for (const file of files) {
        pickupFiles.push({
          filePath: path.join(typeDirPath, file),
          type: pickupType,
        });
      }
    }
  }

  return pickupFiles;
}

/**
 * Process all pickup files
 */
async function processPickups() {
  try {
    console.log("Processing pickups...");
    console.log(`Reading from: ${PICKUPS_DIR}`);

    ensureDirectory(PATHS.output);

    if (!fs.existsSync(PICKUPS_DIR)) {
      throw new Error(`Pickups directory not found: ${PICKUPS_DIR}`);
    }

    const pickupFiles = findPickupFiles(PICKUPS_DIR);

    if (pickupFiles.length === 0) {
      throw new Error(`No pickup JSON files found in ${PICKUPS_DIR}`);
    }

    console.log(`Found ${pickupFiles.length} pickup files`);

    ensureDirectory(OUTPUT_DIR);
    ensureDirectory(ICONS_OUTPUT_DIR);
    ensureDirectory(PUBLIC_ICONS_DIR);

    const processed: string[] = [];
    const errors: string[] = [];
    const copiedIcons: string[] = [];
    const missingIcons: string[] = [];
    const typeCounts: Record<PickupType, number> = {
      AbilityMod: 0,
      WeaponMod: 0,
      MeleeMod: 0,
      Perk: 0,
      Relic: 0,
      Consumable: 0,
    };

    for (const { filePath, type } of pickupFiles) {
      try {
        const fileName = path.basename(filePath);
        const rawData = readJSON<RawPickupData[]>(filePath);

        if (!Array.isArray(rawData) || rawData.length === 0) {
          throw new Error(`Invalid format: expected non-empty array`);
        }

        const rawPickup = rawData[0];
        const finalType = getPickupType(rawPickup.Type, type);
        const normalized = normalizePickup(rawPickup, fileName, finalType);

        const outputFile = path.join(OUTPUT_DIR, `${normalized.id}.json`);
        writeJSON(outputFile, normalized);
        processed.push(normalized.id);
        typeCounts[finalType]++;

        if (normalized.iconPath) {
          const iconCopied = copyPickupIcon(normalized.iconPath, normalized.id, finalType);
          if (iconCopied) {
            copiedIcons.push(normalized.id);
          } else {
            missingIcons.push(normalized.id);
          }
        }
      } catch (error) {
        const errorMsg = `Error processing ${filePath}: ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    if (processed.length === 0) {
      throw new Error("No pickups were successfully processed");
    }

    processed.sort();

    console.log(`\n✓ Successfully processed ${processed.length} pickups`);
    console.log(`✓ Output written to: ${OUTPUT_DIR}`);
    console.log(`\nBreakdown by type:`);
    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > 0) {
        console.log(`  - ${type}: ${count}`);
      }
    });

    if (copiedIcons.length > 0) {
      console.log(`\n✓ Successfully copied ${copiedIcons.length} icon(s)`);
    }

    if (missingIcons.length > 0) {
      console.warn(`\n⚠ ${missingIcons.length} icon(s) not found: ${missingIcons.join(", ")}`);
    }

    if (errors.length > 0) {
      console.warn(`\n⚠ ${errors.length} file(s) had errors:`);
      errors.forEach((err) => console.warn(`  - ${err}`));
    }
  } catch (error) {
    console.error("Fatal error processing pickups:", error);
    process.exit(1);
  }
}

processPickups();

