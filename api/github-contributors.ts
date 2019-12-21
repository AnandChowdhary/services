import { NowRequest, NowResponse } from "@now/node";
import axios, { AxiosResponse } from "axios";
import { User } from "../helpers/github";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const response = (await axios.get(
      `https://api.github.com/repos/${req.query.repo}/contributors`,
      {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`,
          "User-Agent": "AnandChowdhary/services"
        }
      }
    )) as AxiosResponse<User[]>;
    const contributors = response.data.filter(user => user.type !== "Bot");
    // res.setHeader(
    //   "Cache-Control",
    //   `max-age=${req.query.cacheAge || 86400}, public`
    // );
    return res.json({ contributors });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
