/**
 * Clean generated data and image files
 */

import * as path from "path";
import * as fs from "fs";
import { PATHS, getFiles } from "./utils";

const DIRECTORIES_TO_CLEAN = [
  // Generated JSON files
  path.join(PATHS.output, "abilities", "generated"),
  path.join(PATHS.output, "pickups", "generated"),
  path.join(PATHS.output, "weapons", "generated"),
  // Generated images in lib/data
  path.join(PATHS.output, "abilities", "images"),
  path.join(PATHS.output, "pickups", "images"),
  // Generated images in public
  path.join(process.cwd(), "public", "abilities"),
  path.join(process.cwd(), "public", "pickups"),
] as const;

/**
 * Clean all files in a directory
 */
function cleanDirectory(dirPath: string): number {
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  const files = getFiles(dirPath);
  let cleaned = 0;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    try {
      fs.unlinkSync(filePath);
      cleaned++;
    } catch (error) {
      console.warn(`Failed to delete ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return cleaned;
}

/**
 * Clean all generated files
 */
function clean() {
  try {
    console.log("Cleaning generated files...");

    let totalCleaned = 0;

    for (const dir of DIRECTORIES_TO_CLEAN) {
      const cleaned = cleanDirectory(dir);
      totalCleaned += cleaned;
      if (cleaned > 0) {
        console.log(`✓ Cleaned ${cleaned} file(s) from ${path.relative(process.cwd(), dir)}`);
      }
    }

    if (totalCleaned === 0) {
      console.log("✓ No generated files to clean");
    } else {
      console.log(`\n✓ Successfully cleaned ${totalCleaned} file(s) total`);
    }
  } catch (error) {
    console.error("Fatal error cleaning files:", error);
    process.exit(1);
  }
}

clean();

