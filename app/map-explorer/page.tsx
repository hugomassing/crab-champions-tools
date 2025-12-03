import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

export default function MapExplorerPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container>
        <PageHeader
          title="Map Explorer"
          description="Explore all maps, locations, and secrets in Crab Champions. Discover hidden areas, collectibles, and optimal paths."
        />

        <div className="rounded-lg border border-border bg-muted/30 p-8 sm:p-12 text-center">
          <p className="text-muted-foreground">
            Map explorer content will be displayed here once data files are provided.
          </p>
        </div>
      </Container>
    </div>
  );
}

