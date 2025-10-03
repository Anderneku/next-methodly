import { ChartAreaInteractive } from "@/components/charts/TotalsBarChart";
import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";

import data from "../data.json";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <h2 className="text-2xl text-center w-full p-4">Goals</h2>
        <div className="flex flex-col gap-4 md:gap-6 ">
          <SectionCards />
        </div>
      </div>
    </div>
  );
}
