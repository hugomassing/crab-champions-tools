import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import PickupList from "@/components/pickups/PickupList";
import { loadPickupsSync } from "@/lib/data/loaders";

export default function PickupsPage() {
  const pickups = loadPickupsSync();

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container>
        <PageHeader
          title="Pickups"
          description="Browse all pickups including perks, mods, relics, and consumables. Discover powerful combinations and build synergies."
        />

        <PickupList pickups={pickups} />
      </Container>
    </div>
  );
}

