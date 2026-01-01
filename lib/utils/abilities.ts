import { AbilityRarity } from "@/lib/types/abilities";
import { AbilitySpawnType } from "@/lib/types/abilities";
import { rarityColors } from "./weapons";

export { rarityColors };

export function formatCooldown(cooldown: number): string {
  if (cooldown < 1) {
    return `${(cooldown * 1000).toFixed(0)}ms`;
  }
  return `${cooldown.toFixed(1)}s`;
}

export function formatSpawnType(spawnType?: AbilitySpawnType): string {
  if (!spawnType) return "";
  
  const formatted = spawnType.replace(/([A-Z])/g, " $1").trim();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
}

export function formatSpawnDelay(delay?: number): string {
  if (delay === undefined) return "";
  if (delay < 1) {
    return `${(delay * 1000).toFixed(0)}ms`;
  }
  return `${delay.toFixed(2)}s`;
}

