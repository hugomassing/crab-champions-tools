/**
 * Utility functions for processing scripts
 */

import * as fs from "fs";
import * as path from "path";

export const PATHS = {
  gameAssets: path.join(process.cwd(), "game-assets"),
  output: path.join(process.cwd(), "lib", "data"),
} as const;

/**
 * Ensure a directory exists, creating it if necessary
 */
export function ensureDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Read a JSON file and parse it
 */
export function readJSON<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
}

/**
 * Write data to a JSON file with pretty formatting
 */
export function writeJSON<T>(filePath: string, data: T): void {
  const dir = path.dirname(filePath);
  ensureDirectory(dir);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * Get all files in a directory (non-recursive)
 */
export function getFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((file) => {
      const filePath = path.join(dirPath, file);
      return fs.statSync(filePath).isFile();
    });
}

/**
 * Get all directories in a directory (non-recursive)
 */
export function getDirectories(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((file) => {
      const filePath = path.join(dirPath, file);
      return fs.statSync(filePath).isDirectory();
    });
}

/**
 * Read a text file
 */
export function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Write a text file
 */
export function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  ensureDirectory(dir);
  fs.writeFileSync(filePath, content, "utf-8");
}

