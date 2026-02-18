import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardProps {
  label: string;
  value: string;
  hint: string;
}

export function MetricsCard({ label, value, hint }: MetricsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="muted-text">{hint}</p>
      </CardContent>
    </Card>
  );
}
