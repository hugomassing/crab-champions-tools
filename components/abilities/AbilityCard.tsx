"use client";

import Image from "next/image";
import { useState } from "react";
import { Ability } from "@/lib/types/abilities";
import { formatCooldown, formatSpawnType, formatSpawnDelay } from "@/lib/utils/abilities";
import RarityBadge from "@/components/shared/RarityBadge";

interface AbilityCardProps {
  ability: Ability & {
    additionalDescription?: string;
    tags?: string[];
    tips?: string[];
  };
}

export default function AbilityCard({ ability }: AbilityCardProps) {
  const description = ability.additionalDescription || ability.description;
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
    const index = ability.id.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  const hasCharacteristics =
    ability.spawnType ||
    ability.spawnDelay !== undefined ||
    ability.projectileId;

  const iconPath = `/abilities/${ability.id}.png`;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {!imageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <Image
                src={iconPath}
                alt={ability.name}
                fill
                className="object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className={`h-full w-full bg-gradient-to-br ${getPlaceholderGradient()} opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-background/80 p-6 backdrop-blur-sm">
                <div
                  className="h-16 w-16 rounded-full bg-gradient-to-br opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                  style={{
                    background:
                      "linear-gradient(to bottom right, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))",
                  }}
                />
              </div>
            </div>
          </>
        )}

        {ability.requiresUnlock && (
          <div className="absolute top-3 right-3 flex gap-1.5">
            <div
              className="group/icon relative rounded-full bg-background/90 p-1.5 shadow-md backdrop-blur-sm transition-all hover:scale-110"
              title="Requires Unlock"
            >
              <svg
                className="h-3.5 w-3.5 text-muted-foreground"
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

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-foreground">
            {ability.name}
          </h3>
          <RarityBadge rarity={ability.rarity} />
        </div>

        <p className="mb-4 text-sm text-muted-foreground">{description}</p>

        {hasCharacteristics && (
          <div className="mb-4 space-y-2 border-t border-border pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Characteristics
            </h4>
            <div className="flex flex-wrap gap-2">
              {ability.spawnType && (
                <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {formatSpawnType(ability.spawnType)}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2 border-t border-border pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Stats
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {ability.cooldown !== undefined && (
              <div>
                <span className="font-semibold text-foreground">Cooldown:</span>
                <span className="ml-1 text-muted-foreground">
                  {formatCooldown(ability.cooldown)}
                </span>
              </div>
            )}
            {ability.spawnDelay !== undefined && (
              <div>
                <span className="font-semibold text-foreground">Spawn Delay:</span>
                <span className="ml-1 text-muted-foreground">
                  {formatSpawnDelay(ability.spawnDelay)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

