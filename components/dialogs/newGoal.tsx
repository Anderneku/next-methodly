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
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IconTarget } from "@tabler/icons-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { XIcon } from "lucide-react";

export default function NewGoal() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const createGoal = useMutation(api.goals.createNewGoal);

  const { user } = useUser();
  const createEntry = useMutation(api.dailyEntries.createDailyEntry);
  const syncGoals = useMutation(api.dailyEntries.syncDailyEntryGoals);

  function addNewGoal() {
    if (user) {
      createGoal({ description: description, title: title, userId: user.id });
      createEntry({ userId: user?.id });
      syncGoals({userId: user.id})
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button variant={"outline"} className="w-full bg-none shadow-none">
          Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <IconTarget />
            New Goal
            <DialogClose
              className="ml-auto rounded-full hover:bg-secondary hover:text-secondary-foreground active:ring-2"
              onClick={() => setOpen(false)}
            >
              <XIcon size={20} />
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Set a New Goal You Want to Achieve
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Take Over the World"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              name="description"
              placeholder="Short Description"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild onClick={() => setOpen(false)}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              setOpen(false);
              addNewGoal();
            }}
          >
            Set Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
