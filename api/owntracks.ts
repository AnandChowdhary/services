import { NowRequest, NowResponse } from "@now/node";
import { reverseGeocoding } from "../helpers/open-street-maps";
import { writeGitHubFile, readGitHubFile } from "../helpers/github";
import axios from "axios";

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
    const ownTracks: OwnTracks = { ...req.body };
    if (!ownTracks || !Object.keys(ownTracks).length)
      throw new Error("No OwnTracks data found");
    const details = await reverseGeocoding(ownTracks.lat, ownTracks.lon);
    const privateData = {
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
      "AnandChowdhary/life-data-private",
      "location.json",
      `📍 ${details.display_name}`,
      JSON.stringify(privateData, null, 2)
    );
    const publicData = {
      locality: details.address.locality,
      city:
        details.address.city || details.address.town || details.address.hamlet,
      village: details.address.village,
      county: details.address.county,
      suburb: details.address.suburb,
      state_district: details.address.state_district,
      state: details.address.state,
      country: details.address.country
    };
    if (publicData.country === "United States of America")
      publicData.country = "United States";
    const currentGitHubData = await readGitHubFile(
      "AnandChowdhary/life-data",
      "location.json"
    );
    if (
      currentGitHubData.content.replace(/\n/g, "") !==
        Buffer.from(JSON.stringify(publicData, null, 2)).toString("base64") &&
      publicData.city
    ) {
      await axios.post(
        `https://maker.ifttt.com/trigger/location_changed/with/key/${process.env.IFTTT_WEBHOOK_LOCATION_KEY}`,
        {
          value1: `📍 ${publicData.city}, ${publicData.country}`
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "location.json",
        `📍 ${publicData.city}, ${publicData.country}`,
        JSON.stringify(publicData, null, 2)
      );
    }
    return res.json({ success: true });
  } catch (error) {
    console.log("Caught error", error);
    // Here, we keep 200 because OwnTracks would otherwise
    // keep sending requests until it sees a 200
    res.status(200);
    res.json({ error: "Unable to add OwnTracks data" });
  }
};
