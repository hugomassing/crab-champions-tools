import Link from "next/link";
import Container from "@/components/layout/Container";
import { TOOL_CARDS, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-4">
            {SITE_NAME}
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            {SITE_DESCRIPTION}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
          {TOOL_CARDS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative overflow-hidden rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary hover:bg-gradient-to-br hover:from-background hover:to-secondary/30"
            >
              <div className="flex flex-col space-y-3">
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </h2>
                <p className="text-muted-foreground">{tool.description}</p>
                <div className="flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore tool
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
