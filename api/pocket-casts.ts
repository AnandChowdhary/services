import { NowRequest, NowResponse } from "@now/node";
import { safeDump } from "js-yaml";
import PocketCasts from "pocketcasts";
import { writeGitHubFile } from "../helpers/github";

const pocketCasts = new PocketCasts(
  process.env.POCKET_CASTS_USERNAME,
  process.env.POCKET_CASTS_PASSWORD
);

export default async (req: NowRequest, res: NowResponse) => {
  try {
    await pocketCasts.login();
    if (new Date().getDay() === 3) {
      const list = safeDump((await pocketCasts.getList()).podcasts);
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "podcasts.yml",
        "🎙️ Update Pocket Casts list",
        list
      );
    }
    const history = safeDump((await pocketCasts.getHistory()).episodes);
    await writeGitHubFile(
      "AnandChowdhary/life-data",
      "podcast-history.yml",
      "🎤 Update Pocket Cast history",
      history
    );
    res.json({ done: true });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
