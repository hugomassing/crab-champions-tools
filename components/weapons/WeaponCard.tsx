import { Weapon } from "@/lib/types/weapons";
import RarityBadge from "./RarityBadge";
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

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <div
          className={`h-full w-full bg-gradient-to-br ${getPlaceholderGradient()} opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-background/80 p-6 backdrop-blur-sm">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <RarityBadge rarity={weapon.rarity} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold text-foreground">{weapon.name}</h3>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{description}</p>

        <div className="mb-4 space-y-2 border-t border-border pt-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {stats.clipSize !== undefined && (
              <div>
                <span className="font-semibold text-foreground">Clip Size:</span>
                <span className="ml-1 text-muted-foreground">{stats.clipSize}</span>
              </div>
            )}
            {stats.reloadDuration !== undefined && (
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
            {stats.verticalRecoil !== undefined && stats.verticalRecoil > 0 && (
              <div>
                <span className="font-semibold text-foreground">Recoil:</span>
                <span className="ml-1 text-muted-foreground">
                  {stats.verticalRecoil.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>

        {weapon.tags && weapon.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {weapon.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

