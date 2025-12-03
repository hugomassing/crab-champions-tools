/**
 * Example script template for processing game assets
 *
 * This is a template showing the structure for processing game files
 * and generating JSON data files.
 *
 * Available utilities from ./utils:
 * - PATHS: Predefined paths for game-assets and output directories
 * - ensureDirectory(dir): Create directory if it doesn't exist
 * - readFile(path): Read a text file
 * - readJSON<T>(path): Read and parse a JSON file
 * - writeFile(path, content): Write a text file
 * - writeJSON<T>(path, data): Write data as formatted JSON
 * - getFiles(dir): Get all files in a directory
 * - getDirectories(dir): Get all subdirectories in a directory
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as path from "path";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PATHS, ensureDirectory, getFiles, readFile, writeJSON } from "./utils";

/**
 * Process game assets and generate JSON data
 */
async function processAssets() {
  try {
    console.log("Starting asset processing...");

    // Ensure output directory exists
    ensureDirectory(PATHS.output);

    // Example: Read files from game-assets directory
    // const assetFolder = path.join(PATHS.gameAssets, "your-asset-folder");
    // const assetFiles = getFiles(assetFolder);

    // Example: Process each file
    // const processedData = assetFiles.map(file => {
    //   const filePath = path.join(assetFolder, file);
    //   const content = readFile(filePath);
    //   // Process content here
    //   return processedContent;
    // });

    // Example: Write output JSON
    // const outputPath = path.join(PATHS.output, "output.json");
    // writeJSON(outputPath, processedData);

    console.log("Asset processing complete!");
  } catch (error) {
    console.error("Error processing assets:", error);
    process.exit(1);
  }
}

// Run the processor
processAssets();
