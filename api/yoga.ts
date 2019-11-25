import { NowRequest, NowResponse } from "@now/node";
import { writeGitHubFile } from "../helpers/github";
import { safeDump } from "js-yaml";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const yogaData = { ...req.body };
    if (!yogaData || !Object.keys(yogaData).length)
      throw new Error("No Yoga data found");
    await writeGitHubFile(
      "AnandChowdhary/life-data-private",
      "health.json",
      `🌡 Update health data from iPhone`,
      JSON.stringify(yogaData, null, 2)
    );
    const getSleepSamples = yogaData.getSleepSamples;
    if (getSleepSamples)
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "sleep.yml",
        "🛌 Update sleep data",
        safeDump(getSleepSamples)
      );
    const getHeartRateSamples = yogaData.getHeartRateSamples;
    if (getHeartRateSamples)
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "heart-rate.yml",
        "💓 Update heart rate data",
        safeDump(getHeartRateSamples)
      );
    const getDailyStepCountSamples = yogaData.getDailyStepCountSamples;
    if (getDailyStepCountSamples)
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "step-count.yml",
        "🚶 Update daily steps data",
        safeDump(getDailyStepCountSamples)
      );
    const getDailyFlightsClimbedSamples =
      yogaData.getDailyFlightsClimbedSamples;
    if (getDailyFlightsClimbedSamples)
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "flights-climbed.yml",
        "🧗 Update flights climbed data",
        safeDump(getDailyFlightsClimbedSamples)
      );
    const getDailyDistanceWalkingRunningSamples =
      yogaData.getDailyDistanceWalkingRunningSamples;
    if (getDailyDistanceWalkingRunningSamples)
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "distance.yml",
        "🚶 Update walking distance data",
        safeDump(getDailyDistanceWalkingRunningSamples)
      );
    const getActiveEnergyBurned = yogaData.getActiveEnergyBurned;
    if (getActiveEnergyBurned)
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "active-energy.yml",
        "🏋️ Update active energy data",
        safeDump(getActiveEnergyBurned)
      );
    const getBasalEnergyBurned = yogaData.getBasalEnergyBurned;
    if (getBasalEnergyBurned)
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "basal-energy.yml",
        "💪 Update basal energy data",
        safeDump(getBasalEnergyBurned)
      );
    return res.json({ success: true });
  } catch (error) {
    res.status(200);
    res.json({ error });
  }
};
