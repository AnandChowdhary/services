import { NowRequest, NowResponse } from "@now/node";
import axios from "axios";
import natural from "natural";
const SentenceTokenizer = new (natural as any).SentenceTokenizer() as natural.WordTokenizer;

const safeParam = (param: string | string[], value: number) =>
  param && typeof param === "string" && !isNaN(parseInt(param))
    ? parseInt(param)
    : value;

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const searchResults = (
      await axios.get<{
        query: { search: { title: string; pageid: string }[] };
      }>(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
          req.query.q as string
        )}`
      )
    ).data;
    const pageId = searchResults.query.search[0].pageid;
    const pageResult = (
      await axios.get<{
        query: {
          pages: { [index: string]: { title: string; extract: string } };
        };
      }>(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${pageId}`
      )
    ).data;
    const limit = safeParam(req.query.length, 300);
    const min = safeParam(req.query.length, 50);
    const tokens = SentenceTokenizer.tokenize(
      pageResult.query.pages[pageId].extract
    );
    let result = "";
    let length = 0;
    for (const token of tokens) {
      if (length + token.length <= limit) {
        result += ` ${token}`;
        length += token.length;
      } else break;
    });
    if (result.length < min) throw new Error("too short");
    res.setHeader(
      "Cache-Control",
      `max-age=${req.query.cacheAge || 86400}, public`
    );
    res.send(result);
  } catch (error) {
    res.status(404);
    res.json({ error: "not found" });
  }
};
