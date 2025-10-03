import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { MoreVertical, Settings } from "lucide-react";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card transition-all hover:scale-[1.02] ">
        <CardHeader>
          <Badge variant="outline" className="text-muted-foreground text-sm">
            23rd Oct, 2025
          </Badge>

          <CardAction>
            <Badge variant="outline">Active</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="w-full flex justify-center font-semibold text-3xl">
          Lose 50 Pounds
        </CardContent>
        <CardFooter className="w-full flex justify-between">
          <p className="text-muted-foreground text-sm">
            <Badge variant={"destructive"}>Deadline</Badge> 18th Dec, 2025
          </p>
          <div className="flex gap-2">
            <Button variant={"secondary"}>
              <Settings />
            </Button>
            <Button className="">Systems</Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card transition-all hover:scale-[1.02]">
        <CardHeader>
          <CardDescription>Goal</CardDescription>
          <CardAction>
            <Badge variant="outline">Active</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="w-full flex justify-center font-semibold text-3xl">
          Startup a Small Business
        </CardContent>
        <CardFooter className="w-full flex justify-between">
          <p className="text-muted-foreground text-sm">
            Lose 50 Pounds by October
          </p>
          <Button className="">Systems</Button>
        </CardFooter>
      </Card>
      <Card className="@container/card transition-all hover:scale-[1.02]">
        <CardHeader>
          <CardDescription>Goal</CardDescription>
          <CardAction>
            <Badge variant="outline">Active</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="w-full flex justify-center font-semibold text-3xl">
          Lose 50 Pounds
        </CardContent>
        <CardFooter className="w-full flex justify-between">
          <p className="text-muted-foreground text-sm">
            Lose 50 Pounds by October
          </p>
          <Button className="">Systems</Button>
        </CardFooter>
      </Card>
      <Card className="@container/card transition-all hover:scale-[1.02]">
        <CardHeader>
          <CardDescription>Goal</CardDescription>
          <CardAction>
            <Badge variant="outline">Active</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="w-full flex justify-center font-semibold text-3xl">
          Lose 50 Pounds
        </CardContent>
        <CardFooter className="w-full flex justify-between">
          <p className="text-muted-foreground text-sm">
            Lose 50 Pounds by October
          </p>
          <Button className="">Systems</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
