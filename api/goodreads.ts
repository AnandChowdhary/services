import { NowRequest, NowResponse } from "@now/node";
import { getGoodreadBooks } from "../helpers/goodreads";
import { safeDump } from "js-yaml";
import { writeGitHubFile } from "../helpers/github";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const result = [
      ...(await getGoodreadBooks("reading")),
      ...(await getGoodreadBooks("read"))
    ];
    await writeGitHubFile(
      "AnandChowdhary/life-data",
      "books.yml",
      "📘 Update Goodreads books",
      safeDump(result)
    );
    res.json({ done: true });
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ error });
  }
};
