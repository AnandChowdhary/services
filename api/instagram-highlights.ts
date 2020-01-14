import { NowRequest, NowResponse } from "@now/node";
import {
  IgApiClient,
  HighlightsRepositoryHighlightsTrayResponseTrayItem
} from "instagram-private-api";
import { writeGitHubFile } from "../helpers/github";
import { safeResult, safeHighlight } from "../helpers/instagram";
const ig = new IgApiClient();
ig.state.generateDevice(process.env.IG_USERNAME);

const safeFirst = (i: HighlightsRepositoryHighlightsTrayResponseTrayItem[]) =>
  i.length ? i[0] : undefined;

const updateInstagramStoryData = async () => {
  await ig.simulate.preLoginFlow();
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  const igAccount = await ig.user.searchExact(process.env.IG_USERNAME);
  const tray = await ig.highlights.highlightsTray(igAccount.pk);
  const media = await ig.feed
    .reelsMedia({ userIds: tray.tray.map(x => x.id) })
    .items();
  const items = [...media].map(i => safeResult(i));
  const highlights = new Set<string>();
  items.forEach(item => {
    item.highlightId.forEach((i: string) => highlights.add(i));
  });
  const highlightData: any = {};
  highlights.forEach(highlight => {
    highlightData[highlight] = {
      meta: safeHighlight(safeFirst(tray.tray.filter(i => i.id === highlight))),
      data: items.filter(i => i.highlightId.includes(highlight))
    };
  });
  await writeGitHubFile(
    "AnandChowdhary/life-data",
    "instagram-highlights.json",
    "🌇 Update Instagram highlights",
    JSON.stringify(highlightData, null, 2)
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
