import type { Resource } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ResourceCardProps {
  resource: Resource;
  kind: "video" | "note";
}

export function ResourceCard({ resource, kind }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="resource-head">
          <Badge>{resource.topic}</Badge>
          <Badge variant="secondary">{kind === "video" ? resource.duration : "PDF"}</Badge>
        </div>
        <CardTitle>{resource.title}</CardTitle>
        <CardDescription>{kind === "video" ? "Watch and revise quickly" : "Download for revision"}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="muted-text">Keep this resource in your daily review list.</p>
      </CardContent>
    </Card>
  );
}
