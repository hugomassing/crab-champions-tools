"use client";

import { PickupType, PickupRarity, LootPool, PickupTag } from "@/lib/types/pickups";
import { formatPickupType } from "@/lib/utils/pickups";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterState = {
  search: string;
  type: PickupType | "all";
  rarity: PickupRarity | "all";
  lootPool: LootPool | "all";
  element: PickupTag | "all";
  requiresUnlock: "all" | "yes" | "no";
};

interface PickupFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const PICKUP_TYPES: PickupType[] = [
  "AbilityMod",
  "WeaponMod",
  "MeleeMod",
  "Perk",
  "Relic",
  "Consumable",
];

const RARITIES: PickupRarity[] = [
  "Common",
  "Greed",
  "Epic",
  "Legendary",
  "Relic",
];

const LOOT_POOLS: LootPool[] = [
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

const ELEMENTS: PickupTag[] = [
  "Fire",
  "Ice",
  "Lightning",
  "Poison",
  "Critical",
  "None",
];

export default function PickupFilters({
  filters,
  onFiltersChange,
}: PickupFiltersProps) {
  const handleFilterChange = (
    key: keyof FilterState,
    value: string
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.type !== "all" ||
    filters.rarity !== "all" ||
    filters.lootPool !== "all" ||
    filters.element !== "all" ||
    filters.requiresUnlock !== "all";

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      type: "all",
      rarity: "all",
      lootPool: "all",
      element: "all",
      requiresUnlock: "all",
    });
  };

  return (
    <div className="mb-6 rounded-lg border bg-background/50 p-4 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px]">
          <Input
            type="text"
            placeholder="Search pickups..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange("type", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {PICKUP_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {formatPickupType(type)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.rarity}
          onValueChange={(value) => handleFilterChange("rarity", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Rarities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            {RARITIES.map((rarity) => (
              <SelectItem key={rarity} value={rarity}>
                {rarity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.lootPool}
          onValueChange={(value) => handleFilterChange("lootPool", value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Loot Pools" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Loot Pools</SelectItem>
            {LOOT_POOLS.map((pool) => (
              <SelectItem key={pool} value={pool}>
                {pool}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.element}
          onValueChange={(value) => handleFilterChange("element", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Elements" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Elements</SelectItem>
            {ELEMENTS.map((element) => (
              <SelectItem key={element} value={element}>
                {element}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.requiresUnlock}
          onValueChange={(value) =>
            handleFilterChange("requiresUnlock", value)
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Unlock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Unlock Status</SelectItem>
            <SelectItem value="yes">Requires Unlock</SelectItem>
            <SelectItem value="no">No Unlock Required</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="outline"
            size="default"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}

