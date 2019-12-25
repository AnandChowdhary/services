import { NowRequest, NowResponse } from "@now/node";
import axios, { AxiosResponse } from "axios";
import { File } from "../helpers/github";

type Contents = File | File[];

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const response = (await axios.get(
      `https://api.github.com/repos/${req.query.repo}/contents/${req.query.path}`,
      {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`,
          "User-Agent": "AnandChowdhary/services"
        }
      }
    )) as AxiosResponse<Contents>;
    const files = response.data;
    if (!Array.isArray(files)) throw new Error("Not a directory");
    const add = parseInt(req.query.add as string) || 0;
    const subtract = parseInt(req.query.subtract as string) || 0;
    const number = files.length + add - subtract;
    const label = req.query.label || req.query.path;
    const message = ((req.query.message as string) || "$1$ file$S$")
      .replace(/\$1\$/g, number.toString())
      .replace(/\$S\$/g, number === 1 ? "" : "s");
    const color = req.query.color || "orange";
    res.setHeader(
      "Cache-Control",
      `max-age=${req.query.cacheAge || 3600}, public`
    );
    return res.json({ schemaVersion: 1, label, message, color });
  } catch (error) {
    return res.status(500).json({ error: "Unable to generate schema" });
  }
};
