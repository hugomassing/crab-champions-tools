import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

export default function DamageCalculatorPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container>
        <PageHeader
          title="Damage Calculator"
          description="Calculate damage output for different weapon and ability combinations. Optimize your build for maximum effectiveness."
        />

        <div className="rounded-lg border border-border bg-muted/30 p-8 sm:p-12 text-center">
          <p className="text-muted-foreground">
            Damage calculator interface will be displayed here once data files are provided.
          </p>
        </div>
      </Container>
    </div>
  );
}

