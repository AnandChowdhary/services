import { NowRequest, NowResponse } from "@now/node";
import { IgApiClient } from "instagram-private-api";
import { writeGitHubFile } from "../helpers/github";
const ig = new IgApiClient();
ig.state.generateDevice(process.env.IG_USERNAME);

const updateInstagramStoryData = async () => {
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(
    process.env.IG_USERNAME,
    process.env.IG_PASSWORD
  );
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  const igAccount = await ig.user.searchExact(process.env.IG_USERNAME);
  const tray = await ig.highlights.highlightsTray(igAccount.pk);
  const media = await ig.feed
    .reelsMedia({ userIds: tray.tray.map(x => x.id) })
    .items();
  await writeGitHubFile(
    "AnandChowdhary/life-data",
    "instagram-highlights.json",
    "🌇 Update Instagram highlights",
    JSON.stringify(media, null, 2)
  );
};

export default async (req: NowRequest, res: NowResponse) => {
  try {
    await updateInstagramStoryData();
    return res.json({ done: true });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
