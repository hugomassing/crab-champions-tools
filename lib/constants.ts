export const SITE_NAME = "Crab Champions Tools";
export const SITE_DESCRIPTION = "Comprehensive tools and information for Crab Champions";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Map Explorer", href: "/map-explorer" },
  { label: "Damage Calculator", href: "/damage-calculator" },
  { label: "Abilities", href: "/abilities" },
  { label: "Weapons", href: "/weapons" },
];

export interface ToolCard {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export const TOOL_CARDS: ToolCard[] = [
  {
    title: "Map Explorer",
    description: "Explore all maps, locations, and secrets in Crab Champions",
    href: "/map-explorer",
  },
  {
    title: "Damage Calculator",
    description: "Calculate damage output for different weapon and ability combinations",
    href: "/damage-calculator",
  },
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
];

