export const SITE_NAME = "Crab Champions Tools";
export const SITE_DESCRIPTION = "Comprehensive tools and information for Crab Champions";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Pickups", href: "/pickups" },
  { label: "Weapons", href: "/weapons" },
  { label: "Abilities", href: "/abilities" },
];

export interface ToolCard {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export const TOOL_CARDS: ToolCard[] = [
  {
    title: "Abilities",
    description: "Browse all abilities, their effects, and upgrade paths",
    href: "/abilities",
  },
  {
    title: "Weapons",
    description: "Comprehensive weapon stats, upgrades, and synergies",
    href: "/weapons",
  },
  {
    title: "Pickups",
    description: "Browse all pickups including perks, mods, relics, and consumables",
    href: "/pickups",
  },
];

