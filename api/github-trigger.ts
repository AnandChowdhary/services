import { NowRequest, NowResponse } from "@now/node";
import axios, { AxiosResponse } from "axios";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    req.body = req.body || {};
    const repo = req.query.repo || req.body.repo;
    const event = req.query.event || req.body.event;
    const client_payload = req.body.client_payload;
    if (!(repo && event)) throw new Error("Enter all fields");
    const response = (await axios.post(
      `https://api.github.com/repos/${req.query.repo}/dispatches`,
      {
        event_type: event,
        client_payload
      },
      {
        headers: {
          Authorization: `token ${process.env.FINDING_ANAND_ACCESS_TOKEN}`,
          "User-Agent": "AnandChowdhary/services"
        }
      }
    )) as AxiosResponse;
    return res.json({ triggered: true, data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to trigger event" });
  }
};
