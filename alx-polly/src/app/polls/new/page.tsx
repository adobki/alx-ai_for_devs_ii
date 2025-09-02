import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewPollPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>New Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Poll creation form will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
