import { NowRequest, NowResponse } from "@now/node";
import axios, { AxiosResponse } from "axios";
import { writeGitHubFile } from "../helpers/github";
import { safeDump } from "js-yaml";

interface WakatimeSummary {
  data: {
    languages: {
      name: number;
      digital: number;
      text: number;
      percent: number;
    }[];
    daily_average_including_other_language: number;
    total_seconds_including_other_language: number;
    days_including_holidays: number;
    human_readable_daily_average_including_other_language: string;
    human_readable_total_including_other_language: string;
    start: string;
    end: string;
  };
}

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const summary = ((await axios.get(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.WAKATIME_API_KEY
          ).toString("base64")}`
        }
      }
    )) as AxiosResponse<WakatimeSummary>).data;
    await writeGitHubFile(
      "AnandChowdhary/life-data",
      "development.yml",
      `👨‍💻 ${[...summary.data.languages]
        .slice(0, 5)
        .map(i => i.name)
        .join(", ")}`,
      safeDump({
        start: summary.data.start,
        end: summary.data.end,
        total: summary.data.total_seconds_including_other_language,
        totalText: summary.data.human_readable_total_including_other_language,
        dailyAverage: summary.data.daily_average_including_other_language,
        dailyAverageText:
          summary.data.human_readable_daily_average_including_other_language,
        days: summary.data.days_including_holidays,
        languages: summary.data.languages
      })
    );
    res.json({ done: true });
  } catch (error) {
    res.status(500);
    res.json({ error: "Unable to add Wakatime data" });
  }
};
