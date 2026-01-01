"use client";

import Image from "next/image";
import { Weapon } from "@/lib/types/weapons";
import { formatReloadDuration, formatFireRate, formatSpread } from "@/lib/utils/weapons";

interface WeaponCardProps {
  weapon: Weapon & {
    additionalDescription?: string;
    tags?: string[];
    tips?: string[];
  };
}

export default function WeaponCard({ weapon }: WeaponCardProps) {
  const description = weapon.additionalDescription || weapon.description;
  const { stats } = weapon;

  const getPlaceholderGradient = () => {
    const gradients = [
      "from-blue-400 to-purple-500",
      "from-green-400 to-blue-500",
      "from-orange-400 to-red-500",
      "from-purple-400 to-pink-500",
      "from-cyan-400 to-blue-500",
      "from-yellow-400 to-orange-500",
    ];
    const index = weapon.id.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  const formatFireMode = (fireMode?: string) => {
    if (!fireMode) return null;
    return fireMode.charAt(0).toUpperCase() + fireMode.slice(1).toLowerCase();
  };

  const formatFormationType = (formationType?: string) => {
    if (!formationType) return null;
    return formationType.replace(/([A-Z])/g, " $1").trim();
  };

  const formatCrosshairType = (crosshairType?: string) => {
    if (!crosshairType) return null;
    return crosshairType.charAt(0).toUpperCase() + crosshairType.slice(1).toLowerCase();
  };

  const hasCharacteristics =
    weapon.dualWield ||
    weapon.fireMode ||
    weapon.formationType ||
    weapon.crosshairType ||
    weapon.startingWeaponMod;

  const accentColor = weapon.tintColor || undefined;
  const hasIcons = weapon.requiresUnlock || weapon.dualWield;

  return (
    <div
      className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-300 hover:shadow-lg"
      style={{
        borderColor: accentColor ? `${accentColor}40` : undefined,
      }}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <div className="absolute inset-0 scale-150">
          <Image
            src="/weapon-placeholder.png"
            alt=""
            fill
            className="object-cover blur-xl opacity-20 saturate-150 transition-opacity duration-300 group-hover:opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-24 w-24 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 rounded-sm overflow-hidden">
            <Image
              src="/weapon-placeholder.png"
              alt={weapon.name}
              fill
              className="object-contain opacity-60"
            />
          </div>
        </div>

        {hasIcons && (
          <div className="absolute top-3 right-3 flex gap-1.5">
            {weapon.requiresUnlock && (
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
            )}

            {weapon.dualWield && (
              <div
                className="group/icon relative rounded-full bg-background/90 p-1.5 shadow-md backdrop-blur-sm transition-all hover:scale-110"
                title="Dual Wield"
              >
                <div className="relative h-3.5 w-3.5">
                  <svg
                    className="absolute left-0 top-0 h-2.5 w-2.5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  <svg
                    className="absolute right-0 bottom-0 h-2.5 w-2.5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3
          className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-foreground"
          style={
            accentColor
              ? {
                  color: accentColor,
                }
              : undefined
          }
        >
          {weapon.name}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground">{description}</p>

        {hasCharacteristics && (
          <div className="mb-4 space-y-2 border-t border-border pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Characteristics
            </h4>
            <div className="flex flex-wrap gap-2">
              {weapon.dualWield && (
                <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  Dual Wield
                </span>
              )}
              {weapon.fireMode && (
                <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {formatFireMode(weapon.fireMode)}
                </span>
              )}
              {weapon.formationType && (
                <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {formatFormationType(weapon.formationType)}
                </span>
              )}
              {weapon.crosshairType && (
                <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {formatCrosshairType(weapon.crosshairType)} Crosshair
                </span>
              )}
              {weapon.startingWeaponMod && (
                <span
                  className="rounded-md px-2 py-1 text-xs font-medium"
                  style={
                    accentColor
                      ? {
                          backgroundColor: `${accentColor}20`,
                          color: accentColor,
                        }
                      : {
                          backgroundColor: "hsl(var(--primary) / 0.1)",
                          color: "hsl(var(--primary))",
                        }
                  }
                >
                  Mod: {weapon.startingWeaponMod.weaponModId.replace(/DA_WeaponMod_/, "")}
                </span>
              )}
            </div>
          </div>
        )}

        {(stats.reloadDuration !== undefined ||
          stats.fireRate !== undefined ||
          stats.baseSpread !== undefined ||
          stats.maxSpread !== undefined ||
          stats.horizontalRecoil !== undefined) && (
          <div className="mb-4 space-y-2 border-t border-border pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Stats
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {stats.reloadDuration !== undefined && stats.reloadDuration > 0 && (
                <div>
                  <span className="font-semibold text-foreground">Reload:</span>
                  <span className="ml-1 text-muted-foreground">
                    {formatReloadDuration(stats.reloadDuration)}
                  </span>
                </div>
              )}
              {stats.fireRate !== undefined && (
                <div>
                  <span className="font-semibold text-foreground">Fire Rate:</span>
                  <span className="ml-1 text-muted-foreground">
                    {formatFireRate(stats.fireRate)}
                  </span>
                </div>
              )}
              {stats.baseSpread !== undefined && (
                <div>
                  <span className="font-semibold text-foreground">Base Spread:</span>
                  <span className="ml-1 text-muted-foreground">
                    {formatSpread(stats.baseSpread)}
                  </span>
                </div>
              )}
              {stats.maxSpread !== undefined && (
                <div>
                  <span className="font-semibold text-foreground">Max Spread:</span>
                  <span className="ml-1 text-muted-foreground">
                    {formatSpread(stats.maxSpread)}
                  </span>
                </div>
              )}
              {stats.horizontalRecoil !== undefined && stats.horizontalRecoil > 0 && (
                <div>
                  <span className="font-semibold text-foreground">Recoil:</span>
                  <span className="ml-1 text-muted-foreground">
                    {stats.horizontalRecoil.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

