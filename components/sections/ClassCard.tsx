import Link from "next/link";
import type { ClassContent } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ClassCardProps {
  classItem: Pick<ClassContent, "grade" | "tagline" | "videos" | "notes">;
}

export function ClassCard({ classItem }: ClassCardProps) {
  return (
    <Card className="class-card-ui">
      <CardHeader>
        <Badge variant="outline">Class {classItem.grade}</Badge>
        <CardTitle>Class {classItem.grade}</CardTitle>
        <CardDescription>{classItem.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="meta-row">
        <span>{classItem.videos.length} videos</span>
        <span>{classItem.notes.length} notes</span>
      </CardContent>
      <CardFooter>
        <Link href={`/class/${classItem.grade.toLowerCase()}`} className="w-full">
          <Button className="w-full">Continue</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
