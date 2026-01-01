import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import AbilityCard from "@/components/abilities/AbilityCard";
import { loadAbilitiesSync } from "@/lib/data/loaders";

export default function AbilitiesPage() {
  const abilities = loadAbilitiesSync();

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container>
        <PageHeader
          title="Abilities"
          description="Browse all abilities, their effects, upgrade paths, and synergies. Plan your ability builds and discover powerful combinations."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {abilities.map((ability) => (
            <AbilityCard key={ability.id} ability={ability} />
          ))}
        </div>
      </Container>
    </div>
  );
}

