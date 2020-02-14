import { NowRequest, NowResponse } from "@now/node";
import goodreads from "goodreads";
const gr = new goodreads.client({});

export default async (req: NowRequest, res: NowResponse) => {
  try {
    return res.json({ name: "John", email: "john@example.com" });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
