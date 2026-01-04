import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

export default function About() {
  return (
    <div className="p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>About Relationship Court</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Relationship Court is a structured space for resolving conflicts
            with clarity, fairness, and emotional safety.
          </p>

          <p className="text-muted-foreground">
            It helps couples slow down emotional reactions and focus on facts,
            boundaries, and constructive outcomes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
