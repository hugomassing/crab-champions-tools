import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import WeaponCard from "@/components/weapons/WeaponCard";
import { loadWeaponsSync } from "@/lib/data/loaders";

export default function WeaponsPage() {
  const weapons = loadWeaponsSync();

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container>
        <PageHeader
          title="Weapons"
          description="Comprehensive weapon stats, upgrades, and synergies. Compare weapons and find the perfect loadout for your playstyle."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {weapons.map((weapon) => (
            <WeaponCard key={weapon.id} weapon={weapon} />
          ))}
        </div>
      </Container>
    </div>
  );
}

