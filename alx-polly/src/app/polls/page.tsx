import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PollsPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Polls</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">List of polls will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
