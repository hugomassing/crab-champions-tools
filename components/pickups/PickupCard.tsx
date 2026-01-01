"use client";

import Image from "next/image";
import { useState } from "react";
import { Pickup } from "@/lib/types/pickups";
import { formatPickupType, formatCooldown } from "@/lib/utils/pickups";
import RarityBadge from "@/components/shared/RarityBadge";

interface PickupCardProps {
  pickup: Pickup & {
    additionalDescription?: string;
    tags?: string[];
    tips?: string[];
  };
}

export default function PickupCard({ pickup }: PickupCardProps) {
  const description = pickup.additionalDescription || pickup.description;
  const [imageError, setImageError] = useState(false);

  const getPlaceholderGradient = () => {
    const gradients = [
      "from-blue-400 to-purple-500",
      "from-green-400 to-blue-500",
      "from-orange-400 to-red-500",
      "from-purple-400 to-pink-500",
      "from-cyan-400 to-blue-500",
      "from-yellow-400 to-orange-500",
    ];
    const index = pickup.id.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  const getTypeColor = (type: Pickup["type"]) => {
    const colors: Record<Pickup["type"], string> = {
      AbilityMod:
        "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700",
      WeaponMod:
        "bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700",
      MeleeMod:
        "bg-red-500/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700",
      Perk: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700",
      Relic:
        "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700",
      Consumable:
        "bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-700",
    };
    return colors[type] || colors.Perk;
  };

  const iconPath = pickup.iconPath ? `/pickups/${pickup.id}.png` : undefined;
  const hasValidIcon = !imageError && iconPath;
  const placeholderPath = "/pickup-placeholder.png";

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative h-32 w-full overflow-hidden">
        {/* Blurred background layer */}
        {hasValidIcon ? (
          <>
            <div className="absolute inset-0 scale-150">
              <Image
                src={iconPath}
                alt=""
                fill
                className="object-cover blur-xl opacity-40 saturate-150 transition-opacity duration-300 group-hover:opacity-50"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 scale-150">
              <Image
                src={placeholderPath}
                alt=""
                fill
                className="object-cover blur-xl opacity-20 saturate-150 transition-opacity duration-300 group-hover:opacity-30"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />
          </>
        )}

        {/* Crisp icon on top */}
        <div className="absolute inset-0 flex items-center justify-center">
          {hasValidIcon ? (
            <div className="relative h-16 w-16 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 rounded-sm overflow-hidden">
              <Image
                src={iconPath}
                alt={pickup.name}
                fill
                className="object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="relative h-16 w-16 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 rounded-sm overflow-hidden">
              <Image
                src={placeholderPath}
                alt={pickup.name}
                fill
                className="object-contain opacity-60"
              />
            </div>
          )}
        </div>

        {/* Type and Rarity badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span
            className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase backdrop-blur-sm ${getTypeColor(
              pickup.type
            )}`}
          >
            {formatPickupType(pickup.type)}
          </span>
          <RarityBadge
            rarity={pickup.rarity}
            className="shrink-0 backdrop-blur-sm"
          />
        </div>

        {/* Unlock indicator */}
        {pickup.requiresUnlock && (
          <div className="absolute top-2 right-2">
            <div
              className="group/icon relative rounded-full bg-background/90 p-1 shadow-md backdrop-blur-sm transition-all hover:scale-110"
              title="Requires Unlock"
            >
              <svg
                className="h-3 w-3 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="mb-1.5">
          <h3 className="text-sm font-bold text-foreground transition-colors group-hover:text-foreground">
            {pickup.name}
          </h3>
        </div>

        <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
          {description}
        </p>

        {(pickup.cooldown !== undefined || pickup.baseBuff !== undefined) && (
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            {pickup.cooldown !== undefined && (
              <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
                CD: {formatCooldown(pickup.cooldown)}
              </span>
            )}
            {pickup.baseBuff !== undefined && (
              <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
                +{pickup.baseBuff}
                {pickup.getBuffAsMultiplier ? "%" : ""}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
