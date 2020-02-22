import { NowRequest, NowResponse } from "@now/node";
import { getGoodreadBooks } from "../helpers/goodreads";
import { safeDump } from "js-yaml";
import { writeGitHubFile } from "../helpers/github";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const result = [
      ...(await getGoodreadBooks("reading")),
      ...(await getGoodreadBooks("read"))
    ]
      .sort(
        (a, b) =>
          new Date(a.readAt || a.dateAdded).getTime() -
          new Date(b.readAt || b.dateAdded).getTime()
      )
      .reverse();
    const booksMap = new Map(result.map(o => [o.title, o]));
    const uniqueBooks = [...booksMap.values()];
    await writeGitHubFile(
      "AnandChowdhary/life-data",
      "books.yml",
      "📘 Update Goodreads books",
      safeDump(uniqueBooks)
    );
    res.json({ done: true });
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ error });
  }
};
