import { NowRequest, NowResponse } from "@now/node";
import axios from "axios";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const data = await axios.get(
      `https://www.goodreads.com/review/list/6784560.xml?shelf=read&key=${process.env.GOODREADS_KEY}&v=2`,
      {
        responseType: "text"
      }
    );
    res.json({ user: "data" });
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ error });
  }
};
