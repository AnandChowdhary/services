import { NowRequest, NowResponse } from "@now/node";
import axios, { AxiosResponse } from "axios";
import { User } from "../helpers/github";
import { imageToDataUri } from "../helpers/files";

export const githubUserPics = async (
  req: NowRequest,
  res: NowResponse,
  url: string
) => {
  try {
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
      images += `<image x="${(i % 8) * 90 + 5}" y="${Math.floor(i / 8) * 90 +
        5}" width="85" height="85" xlink:href="${await imageToDataUri(
        contributor.avatar_url
      )}"><title>${contributor.login}</title></image>`;
      i++;
    }
    return res.send(`
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="${(contributors.length % 8) * 90 + 95}"
        height="${Math.floor(contributors.length / 8) * 90 + 95}"
      >
        ${images}
      </svg>
    `);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
