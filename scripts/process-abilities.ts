/**
 * Process ability JSON files and generate normalized per-entity JSON files
 */

import * as path from "path";
import * as fs from "fs";
import { PATHS, getFiles, readJSON, writeJSON, ensureDirectory } from "./utils";
import { RawAbilityData } from "../lib/types/game-data";
import { Ability } from "../lib/types/abilities";
import {
  validateAbilityData,
  validateRarity,
  validateHitmarkerType,
  validateAbilitySpawnType,
  extractAssetName,
  extractProjectileId,
} from "./validate";
import { getAbilityMappingByGameId } from "../lib/data/abilities/index";

const ABILITIES_DIR = path.join(PATHS.gameAssets, "Content", "Blueprint", "Ability");
const OUTPUT_DIR = path.join(PATHS.output, "abilities", "generated");

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
  const hitmarkerType = validateHitmarkerType(raw.Properties.HitmarkerType);
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
    hitmarkerType,
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

    const processed: string[] = [];
    const errors: string[] = [];

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

