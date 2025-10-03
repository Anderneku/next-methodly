"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IconBlocks, IconTarget } from "@tabler/icons-react";
import { toast } from "sonner";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { title } from "process";
import { description } from "../charts/TotalsBarChart";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function NewSystem() {
  const { user } = useUser();
  const createEntry = useMutation(api.dailyEntries.createDailyEntry);
  const goals = useQuery(api.goals.getGoals, { userId: user?.id || "" });
  const addSystem = useMutation(api.systems.createSystem);
  const syncSystem = useMutation(api.dailyEntries.syncDailyEntrySystems);

  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [title, setTitle] = useState("");

  function createSystem() {
    if (user) {
      addSystem({
        title: title,
        userId: user.id,
        goalId: selectedGoal,
      });
      createEntry({ userId: user?.id });
      syncSystem({ userId: user.id, goalId: selectedGoal });
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button variant={"outline"} className="w-full bg-none shadow-none">
          System
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <IconTarget />
            New System
            <DialogClose
              className="ml-auto rounded-full hover:bg-secondary hover:text-secondary-foreground active:ring-2"
              onClick={() => setOpen(false)}
            >
              <XIcon size={20} />
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Build a New System to Help You Get One Step Closer to Achieving Your
            Goal
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Goal</Label>
            <Select
              value={selectedGoal}
              onValueChange={(value) => setSelectedGoal(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Goals</SelectLabel>
                  {goals?.map((goal, index) => (
                    <SelectItem key={index} value={goal._id}>
                      {goal.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              name="title"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={() => {
              createSystem();
              setOpen(false);
              toast.success("New System Created!");
            }}
          >
            Add System
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
