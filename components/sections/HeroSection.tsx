import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HeroSectionProps {
  title: string;
  description: string;
}

export function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <Card className="hero-card">
      <CardHeader>
        <Badge variant="secondary" className="fit">OnlineLearn</Badge>
        <CardTitle className="hero-title">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="hero-actions">
        <Button>Start learning</Button>
        <Button variant="outline">Explore classes</Button>
      </CardContent>
    </Card>
  );
}
