import { WeaponRarity } from "@/lib/types/weapons";
import { rarityColors } from "@/lib/utils/weapons";

interface RarityBadgeProps {
  rarity: WeaponRarity;
  className?: string;
}

export default function RarityBadge({ rarity, className = "" }: RarityBadgeProps) {
  const colors = rarityColors[rarity];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border ${className}`}
    >
      {rarity}
    </span>
  );
}

