/**
 * Process ability JSON files and generate normalized per-entity JSON files
 */

import * as path from "path";
import * as fs from "fs";
import { PATHS, getFiles, readJSON, writeJSON, ensureDirectory, copyFile } from "./utils";
import { RawAbilityData } from "../lib/types/game-data";
import { Ability } from "../lib/types/abilities";
import {
  validateAbilityData,
  validateRarity,
  validateAbilitySpawnType,
  extractAssetName,
  extractProjectileId,
} from "./validate";
import { getAbilityMappingByGameId } from "../lib/data/abilities/index";

const ABILITIES_DIR = path.join(PATHS.gameAssets, "Content", "Blueprint", "Ability");
const OUTPUT_DIR = path.join(PATHS.output, "abilities", "generated");
const ICONS_SOURCE_DIR = path.join(PATHS.gameAssets, "Content", "UI", "Icon", "Ability");
const ICONS_OUTPUT_DIR = path.join(PATHS.output, "abilities", "images");
const PUBLIC_ICONS_DIR = path.join(process.cwd(), "public", "abilities");

/**
 * Copy ability icon from game assets to output directory and public folder
 */
function copyAbilityIcon(iconName: string | undefined, customId: string): boolean {
  if (!iconName) {
    return false;
  }

  const sourcePath = path.join(ICONS_SOURCE_DIR, `${iconName}.png`);

  if (!fs.existsSync(sourcePath)) {
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
 * Normalize a raw ability data object to web-friendly format
 */
function normalizeAbility(raw: RawAbilityData, fileName: string): Ability {
  validateAbilityData(raw, fileName);

  const gameId = raw.Name;
  const mapping = getAbilityMappingByGameId(gameId);

  if (!mapping) {
    throw new Error(`No mapping found for game ID: ${gameId}`);
  }

  const id = mapping.customId;
  const rarity = validateRarity(raw.Properties.Rarity, fileName);
  const spawnType = validateAbilitySpawnType(raw.Properties.AbilitySpawnType);
  const projectileId = extractProjectileId(raw.Properties.ProjectileDA);
  const iconPath = extractAssetName(raw.Properties.Icon?.ObjectPath);

  return {
    id,
    gameId,
    name: raw.Properties.Name,
    description: raw.Properties.Description,
    rarity,
    cooldown: raw.Properties.Cooldown ?? 0,
    spawnType,
    spawnDelay: raw.Properties.AbilitySpawnDelay,
    projectileId,
    requiresUnlock: raw.Properties.bRequiresUnlock ?? false,
    iconPath,
  };
}

/**
 * Process all ability files
 */
async function processAbilities() {
  try {
    console.log("Processing abilities...");
    console.log(`Reading from: ${ABILITIES_DIR}`);

    ensureDirectory(PATHS.output);

    if (!fs.existsSync(ABILITIES_DIR)) {
      throw new Error(`Abilities directory not found: ${ABILITIES_DIR}`);
    }

    const abilityFiles = getFiles(ABILITIES_DIR).filter((file) =>
      file.endsWith(".json")
    );

    if (abilityFiles.length === 0) {
      throw new Error(`No ability JSON files found in ${ABILITIES_DIR}`);
    }

    console.log(`Found ${abilityFiles.length} ability files`);

    ensureDirectory(OUTPUT_DIR);
    ensureDirectory(ICONS_OUTPUT_DIR);
    ensureDirectory(PUBLIC_ICONS_DIR);

    const processed: string[] = [];
    const errors: string[] = [];
    const copiedIcons: string[] = [];
    const missingIcons: string[] = [];

    for (const file of abilityFiles) {
      try {
        const filePath = path.join(ABILITIES_DIR, file);
        const rawData = readJSON<RawAbilityData[]>(filePath);

        if (!Array.isArray(rawData) || rawData.length === 0) {
          throw new Error(`Invalid format: expected non-empty array`);
        }

        const rawAbility = rawData[0];
        const normalized = normalizeAbility(rawAbility, file);

        const outputFile = path.join(OUTPUT_DIR, `${normalized.id}.json`);
        writeJSON(outputFile, normalized);
        processed.push(normalized.id);

        if (normalized.iconPath) {
          const iconCopied = copyAbilityIcon(normalized.iconPath, normalized.id);
          if (iconCopied) {
            copiedIcons.push(normalized.id);
          } else {
            missingIcons.push(normalized.id);
          }
        }
      } catch (error) {
        const errorMsg = `Error processing ${file}: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    if (processed.length === 0) {
      throw new Error("No abilities were successfully processed");
    }

    processed.sort();

    console.log(`\n✓ Successfully processed ${processed.length} abilities`);
    console.log(`✓ Output written to: ${OUTPUT_DIR}`);
    console.log(`✓ Files created: ${processed.join(", ")}`);

    if (copiedIcons.length > 0) {
      console.log(`\n✓ Successfully copied ${copiedIcons.length} icon(s): ${copiedIcons.join(", ")}`);
    }

    if (missingIcons.length > 0) {
      console.warn(`\n⚠ ${missingIcons.length} icon(s) not found: ${missingIcons.join(", ")}`);
    }

    if (errors.length > 0) {
      console.warn(`\n⚠ ${errors.length} file(s) had errors:`);
      errors.forEach((err) => console.warn(`  - ${err}`));
    }
  } catch (error) {
    console.error("Fatal error processing abilities:", error);
    process.exit(1);
  }
}

processAbilities();

