import { WeaponRarity } from "@/lib/types/weapons";
import { AbilityRarity } from "@/lib/types/abilities";
import { rarityColors } from "@/lib/utils/weapons";

type Rarity = WeaponRarity | AbilityRarity;

interface RarityBadgeProps {
  rarity: Rarity;
  className?: string;
}

export default function RarityBadge({ rarity, className = "" }: RarityBadgeProps) {
  const colors = rarityColors[rarity as WeaponRarity];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border ${className}`}
    >
      {rarity}
    </span>
  );
}

