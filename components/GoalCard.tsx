import { Settings } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";

export default function GoalCard({ createdTime, goalTitle, description } : {createdTime :number, goalTitle :string, description :string}) {
  const timestamp = createdTime;
  const date = new Date(timestamp);

  // Format to "October 6, 2025"
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Card className="@container/card transition-all hover:scale-[1.02] ">
      <CardHeader>
        <Badge variant="outline" className="text-muted-foreground text-sm">
          {formattedDate}
        </Badge>

        <CardAction>
          <Badge variant="outline">Active</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="w-full h-full flex gap-4 flex-col justify-center items-center">
        <h2 className="font-semibold text-3xl break-all">{goalTitle}</h2>
        <CardDescription><p className="text-sm break-all">{description}</p></CardDescription>
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        {/* <p className="text-muted-foreground text-sm">
          <Badge variant={"destructive"}>Deadline</Badge> 18th Dec, 2025
        </p> */}
        <div className="flex gap-2 ml-auto">
          <Button variant={"secondary"}>
            <Settings />
          </Button>
          <Button className="">Systems</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
