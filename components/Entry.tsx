"use client";
import { Badge } from "./ui/badge";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { VId } from "convex/values";

type SystemObject = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Entry({ goalTitle, systems, entryId, goalId } : { goalTitle :string, systems :SystemObject[], entryId :any, goalId :string}) {
  const { user } = useUser();
  const toggleCheckbox = useMutation(api.dailyEntries.updateCheckbox);
  const systemsList = useQuery(api.dailyEntries.getSystems, {
    userId: user?.id || "",
    goalId: goalId,
  });

  let total: number = 0;
  let completed: number = 0;
  let percentage: number = 0;
  if (systemsList) {
    for (const system of systemsList) {
      total++;
      if (system.completed == true) {
        completed++;
      }
    }
    percentage = Math.round((completed / total) * 100);
  }

  const indicatorClass = clsx(
    "w-4 h-4",
    percentage >= 100 && "bg-[#5fda5c]",
    percentage >= 1 && percentage < 100 && "bg-[#e0bf2a]",
    percentage == 0 && "bg-[#f83a3a]",
    "rounded-full shadow-2xl"
  );

  function handleToggle(systemId :string) {
    toggleCheckbox({ entryId: entryId, goalId: goalId, systemId: systemId });
  }

  return (
    <Card className="@container/card transition-all hover:scale-[1.02] ">
      <CardHeader>
        <Badge variant="outline" className="text-muted-foreground text-sm">
          {goalTitle}
        </Badge>
        <CardAction>
          <Badge variant={percentage == 100 ? "default" : "destructive"}>{percentage == 100 ? "Done" : "Undone"}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="w-full h-full flex gap-4 flex-col justify-center items-center">
        <div className="flex flex-col gap-1 w-full">
          {systems.map((system, index) => (
            <div
              key={index}
              className="w-full flex items-center  p-2 rounded-xl"
            >
              <p className="w-full break-all text-base">{system.title}</p>
              <Checkbox
                checked={system.completed}
                onCheckedChange={() => handleToggle(system.id)}
                className="size-6 rounded-full shadow-2xl"
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Separator />
        <div className="w-full flex p-4 items-center gap-4">
          {/* yellow-e0bf2a red-f83a3a green-5fda5c */}
          <div>
            <div className={indicatorClass}></div>
          </div>
          <Progress value={percentage} max={100} />
          <p>{Number.isNaN(percentage) ? 0 : percentage}%</p>
        </div>

      </CardFooter>
      {/* <CardFooter className="w-full flex justify-between">
        <div className="flex gap-2 ml-auto">
          <Button variant={"secondary"}>
            <Settings />
          </Button>
          <Button className="">Systems</Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}
