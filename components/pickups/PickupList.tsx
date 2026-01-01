"use client";

import { useState, useMemo } from "react";
import { Pickup } from "@/lib/types/pickups";
import PickupCard from "./PickupCard";
import PickupFilters, { FilterState } from "./PickupFilters";

interface PickupListProps {
  pickups: Pickup[];
}

const initialFilters: FilterState = {
  search: "",
  type: "all",
  rarity: "all",
  lootPool: "all",
  element: "all",
  requiresUnlock: "all",
};

export default function PickupList({ pickups }: PickupListProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredPickups = useMemo(() => {
    return pickups.filter((pickup) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          pickup.name.toLowerCase().includes(searchLower) ||
          pickup.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.type !== "all" && pickup.type !== filters.type) {
        return false;
      }

      if (filters.rarity !== "all" && pickup.rarity !== filters.rarity) {
        return false;
      }

      if (filters.lootPool !== "all") {
        if (!pickup.lootPool || pickup.lootPool !== filters.lootPool) {
          return false;
        }
      }

      if (filters.element !== "all") {
        if (!pickup.pickupTag || pickup.pickupTag !== filters.element) {
          return false;
        }
      }

      if (filters.requiresUnlock !== "all") {
        const requiresUnlock = filters.requiresUnlock === "yes";
        if (pickup.requiresUnlock !== requiresUnlock) {
          return false;
        }
      }

      return true;
    });
  }, [pickups, filters]);

  return (
    <>
      <PickupFilters filters={filters} onFiltersChange={setFilters} />

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredPickups.length} of {pickups.length} pickups
      </div>

      {filteredPickups.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">
            No pickups match your filters. Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filteredPickups.map((pickup) => (
            <PickupCard key={pickup.id} pickup={pickup} />
          ))}
        </div>
      )}
    </>
  );
}

