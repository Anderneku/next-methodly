import { v } from "convex/values";
import { query } from "./_generated/server";

export const getChartData = query({
  args: {
    userId: v.string(),
    year: v.string(),
  },
  handler: async (ctx, args) => {
    const allEntriesForYear = await ctx.db
      .query("daily_entries")
      .withIndex("by_userId_year", (q) =>
        q.eq("userId", args.userId).eq("year", args.year)
      )
      .collect();
    let jan_total = 0;
    let feb_total = 0;
    let mar_total = 0;
    let apr_total = 0;
    let may_total = 0;
    let jun_total = 0;
    let jly_total = 0;
    let aug_total = 0;
    let sep_total = 0;
    let oct_total = 0;
    let nov_total = 0;
    let dec_total = 0;

    let jan_compl = 0;
    let feb_compl = 0;
    let mar_compl = 0;
    let apr_compl = 0;
    let may_compl = 0;
    let jun_compl = 0;
    let jly_compl = 0;
    let aug_compl = 0;
    let sep_compl = 0;
    let oct_compl = 0;
    let nov_compl = 0;
    let dec_compl = 0;

    for (const entry of allEntriesForYear) {
      for (const goal of entry.status) {
        for (const system of goal.systems) {
          switch (entry.month) {
            case "01":
              jan_total += 1;
              if (system.completed == true) jan_compl += 1;
              break;
            case "02":
              feb_total += 1;
              if (system.completed == true) feb_compl += 1;
              break;
            case "03":
              mar_total += 1;
              if (system.completed == true) mar_compl += 1;
              break;
            case "04":
              apr_total += 1;
              if (system.completed == true) apr_compl += 1;
              break;
            case "05":
              may_total += 1;
              if (system.completed == true) may_compl += 1;
              break;
            case "06":
              jun_total += 1;
              if (system.completed == true) jun_compl += 1;
              break;
            case "07":
              jly_total += 1;
              if (system.completed == true) jly_compl += 1;
              break;
            case "08":
              aug_total += 1;
              if (system.completed == true) aug_compl += 1;
              break;
            case "09":
              sep_total += 1;
              if (system.completed == true) sep_compl += 1;
              break;
            case "10":
              oct_total += 1;
              if (system.completed == true) oct_compl += 1;
              break;
            case "11":
              nov_total += 1;
              if (system.completed == true) nov_compl += 1;
              break;
            case "12":
              dec_total += 1;
              if (system.completed == true) dec_compl += 1;
              break;

            default:
              break;
          }
        }
      }
    }
    const months = [
      ["January", jan_compl, jan_total],
      ["February", feb_compl, feb_total],
      ["March", mar_compl, mar_total],
      ["April", apr_compl, apr_total],
      ["May", may_compl, may_total],
      ["June", jun_compl, jun_total],
      ["July", jly_compl, jly_total],
      ["August", aug_compl, aug_total],
      ["September", sep_compl, sep_total],
      ["October", oct_compl, oct_total],
      ["November", nov_compl, nov_total],
      ["December", dec_compl, dec_total],
    ];

    return months.map(([name, compl, total]) => {
      let percentage = Math.round((((compl  / total) * 100) / 3000) * 100);
      return {
        month: name,
         value: Number.isNaN(percentage) ? 0 : percentage
      };
    });
  },
});
