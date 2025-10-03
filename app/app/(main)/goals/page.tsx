"use client";
import { TotalsBarChart } from "@/components/charts/TotalsBarChart";
import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";

import data from "../data.json";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import GoalCard from "@/components/GoalCard";
import { NoGoalsChart } from "@/components/charts/NoGoalsChart";

export default function Dashboard() {
  const { user } = useUser();
  const goals = useQuery(api.goals.getGoals, { userId: user?.id || "" });

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <h2 className="text-2xl text-center w-full p-4">Goals</h2>
        <div className="flex flex-col gap-4 md:gap-6 ">
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <NoGoalsChart/>
            {goals?.map((goal, index) => (
              <GoalCard
                createdTime={goal._creationTime}
                description={goal.description}
                goalTitle={goal.title}
                key={index}
              />
            ))}
          </div>
          <div className="px-4 lg:px-6">
            <TotalsBarChart />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
