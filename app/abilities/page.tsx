import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

export default function AbilitiesPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container>
        <PageHeader
          title="Abilities"
          description="Browse all abilities, their effects, upgrade paths, and synergies. Plan your ability builds and discover powerful combinations."
        />

        <div className="rounded-lg border border-border bg-muted/30 p-8 sm:p-12 text-center">
          <p className="text-muted-foreground">
            Abilities information will be displayed here once data files are provided.
          </p>
        </div>
      </Container>
    </div>
  );
}

