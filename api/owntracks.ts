import { NowRequest, NowResponse } from "@now/node";
import { reverseGeocoding } from "../helpers/open-street-maps";
import { writeGitHubFile } from "../helpers/github";
import { safeDump } from "js-yaml";

interface OwnTracks {
  cog: number;
  batt: number;
  lon: number;
  acc: number;
  vel: number;
  vac: number;
  bs: number;
  lat: number;
  topic: string;
  t: string;
  conn: string;
  tst: number;
  alt: number;
}

const statusify = (status: number) => {
  if (status === 1) return "unplugged";
  if (status === 2) return "charging";
  if (status === 3) return "full";
  return "unknown";
};

const connectify = (status: string) => {
  if (status === "w") return "wireless";
  if (status === "o") return "offline";
  if (status === "m") return "mobile";
  return "unknown";
};

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const ownTracks: OwnTracks = req.body;
    const details = await reverseGeocoding(ownTracks.lat, ownTracks.lon);
    const data = {
      accuracy: ownTracks.acc,
      altitude: ownTracks.alt,
      altitudeAccuracy: ownTracks.vac,
      battery: ownTracks.batt,
      batteryStatus: statusify(ownTracks.bs || 0),
      latitude: ownTracks.lat,
      longitude: ownTracks.lon,
      velocity: ownTracks.vel,
      device: ownTracks.topic,
      connection: connectify(ownTracks.conn || "u"),
      time: new Date(ownTracks.tst * 1000),
      ...details
    };
    await writeGitHubFile(
      "AnandChowdhary/finding-anand-data",
      "location.yml",
      `📍 ${details.display_name}`,
      safeDump(data)
    );
    console.log("Got ownTracks", JSON.stringify(req.body, null, 2));
    return res.json({ success: true });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
