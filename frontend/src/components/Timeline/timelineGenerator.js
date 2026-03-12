  import { nebiusSites } from "../../data/nebiusSites.js";

  const allDates = nebiusSites.map((site) => site.date).flat();

  /* Min and Max Date */
  let min = Infinity,
    max = -Infinity;

  for (const d of allDates) {
    const val = d.year * 4 + d.quarter;
    if (val < min) min = val;
    if (val > max) max = val;
  }

  /* Generate All Date Values */
  const timelineDate = [];

  for (let i = min; i <= max; i++) {
    const year = i % 4 == 0 ? Math.floor(i / 4) - 1 : Math.floor(i / 4);
    const quarter = i % 4 == 0 ? 4 : i % 4;
    timelineDate.push({ quarter, year });
  }

  export { timelineDate };