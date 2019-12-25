import { NowRequest, NowResponse } from "@now/node";
import axios, { AxiosResponse } from "axios";
import { User } from "../helpers/github";
import { imageToDataUri } from "../helpers/files";

const safeParam = (param: string | string[], value: number) =>
  param && typeof param === "string" && !isNaN(parseInt(param))
    ? parseInt(param)
    : value;

export const githubUserPics = async (
  req: NowRequest,
  res: NowResponse,
  url: string
) => {
  try {
    const width = safeParam(req.query.width, 85);
    const itemsPerLine = safeParam(req.query.itemsPerLine, 8);
    const padding = safeParam(req.query.padding, 5);
    const response = (await axios.get(url, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`,
        "User-Agent": "AnandChowdhary/services"
      }
    })) as AxiosResponse<User[]>;
    const contributors = response.data.filter(
      user => user.type !== "Bot" && !["ImgBotApp"].includes(user.login)
    );
    res.setHeader(
      "Cache-Control",
      `max-age=${req.query.cacheAge || 86400}, public`
    );
    res.setHeader("Content-Type", "image/svg+xml");
    let images = "";
    let i = 0;
    for await (const contributor of contributors) {
      images += `<image x="${(i % itemsPerLine) * (width + padding) +
        padding}" y="${Math.floor(i / itemsPerLine) * (width + padding) +
        padding}" width="${width}" height="${width}" xlink:href="${await imageToDataUri(
        contributor.avatar_url
      )}"><title>${contributor.login}</title></image>`;
      i++;
    }
    return res.send(`
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="${(contributors.length % itemsPerLine) * (width + padding) +
          (width + padding + padding)}"
        height="${Math.floor(contributors.length / itemsPerLine) *
          (width + padding) +
          (width + padding + padding)}"
      >
        ${images}
      </svg>
    `);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
