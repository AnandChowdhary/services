import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    console.log("Got ownTracks", JSON.stringify(req.body, null, 2));
    return res.json({ success: true });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
