import { PickupType } from "@/lib/types/pickups";

export function formatPickupType(type: PickupType): string {
  const typeMap: Record<PickupType, string> = {
    AbilityMod: "Ability Mod",
    WeaponMod: "Weapon Mod",
    MeleeMod: "Melee Mod",
    Perk: "Perk",
    Relic: "Relic",
    Consumable: "Consumable",
  };
  return typeMap[type] || type;
}

export function formatBuffValue(value: number, isMultiplier: boolean): string {
  if (isMultiplier) {
    return `${value}%`;
  }
  return value.toString();
}

export function formatCooldown(cooldown: number): string {
  if (cooldown < 1) {
    return `${(cooldown * 1000).toFixed(0)}ms`;
  }
  return `${cooldown.toFixed(1)}s`;
}

