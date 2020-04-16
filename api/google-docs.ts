import { NowRequest, NowResponse } from "@now/node";
import { google } from "googleapis";
import { writeGitHubFile } from "../helpers/github";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DOCS_CLIENT_ID,
  process.env.GOOGLE_DOCS_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_DOCS_ACCESS,
  refresh_token: process.env.GOOGLE_DOCS_REFRESH
});

const docs = google.docs("v1");

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const result = await docs.documents.get({
      documentId: "1Nwbt6I1YF6a20t3e3dlz5ID-zVSB2amYHth3YVdtTJQ",
      auth: oauth2Client
    });
    console.log(result.data.title);
    return res.json({ done: true, data: result.data });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
