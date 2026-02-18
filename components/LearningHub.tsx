import type { ClassContent } from "@/lib/content";
import { classContent } from "@/lib/content";
import { ClassCard } from "@/components/sections/ClassCard";
import { HeroSection } from "@/components/sections/HeroSection";
import { MetricsCard } from "@/components/sections/MetricsCard";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface LearningHubProps {
  classes?: ClassContent[];
}

const metrics: Array<{ label: string; value: string; hint: string }> = [
  { label: "Coverage", value: "Class 5-12", hint: "All major school levels supported" },
  { label: "Daily goal", value: "20 min", hint: "Short sessions for better retention" },
  { label: "Study assets", value: "120+", hint: "Videos, notes and memory flashcards" }
];

export function LearningHub({ classes = classContent }: LearningHubProps) {
  return (
    <div className="app-shell">
      <HeroSection
        title="Learn smarter from Class 5th to 12th."
        description="A premium, iOS-inspired learning experience with videos, notes and flashcards designed for students."
      />

      <section className="stack-md">
        <div className="section-header-row">
          <h2>Choose your class</h2>
          <Input placeholder="Search class, subject or topic" aria-label="Search learning content" />
        </div>
        <Separator />
        <div className="class-grid-ui">
          {classes.map((item) => (
            <ClassCard key={item.grade} classItem={item} />
          ))}
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <MetricsCard key={metric.label} {...metric} />
        ))}
      </section>
    </div>
  );
}
