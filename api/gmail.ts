import { NowRequest, NowResponse } from "@now/node";
import { google } from "googleapis";
import { safeDump } from "js-yaml";
import { writeGitHubFile } from "../helpers/github";

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  access_token: process.env.GMAIL_ACCESS,
  refresh_token: process.env.GMAIL_REFRESH
});

const gmail = google.gmail("v1");

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const today = new Date();
    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const sentLastWeek = (
      await gmail.users.messages.list({
        userId: "me",
        q: `in:sent after:${lastWeek.getUTCFullYear()}/${lastWeek.getUTCMonth() +
          1}/${lastWeek.getUTCDate()}`,
        auth: oauth2Client
      })
    ).data.resultSizeEstimate;
    const sentToday = (
      await gmail.users.messages.list({
        userId: "me",
        q: `in:sent after:${yesterday.getUTCFullYear()}/${yesterday.getUTCMonth() +
          1}/${yesterday.getUTCDate()}`,
        auth: oauth2Client
      })
    ).data.resultSizeEstimate;
    const receivedLastWeek = (
      await gmail.users.messages.list({
        userId: "me",
        q: `after:${lastWeek.getUTCFullYear()}/${lastWeek.getUTCMonth() +
          1}/${lastWeek.getUTCDate()}`,
        auth: oauth2Client
      })
    ).data.resultSizeEstimate;
    const receivedToday = (
      await gmail.users.messages.list({
        userId: "me",
        q: `after:${yesterday.getUTCFullYear()}/${yesterday.getUTCMonth() +
          1}/${yesterday.getUTCDate()}`,
        auth: oauth2Client
      })
    ).data.resultSizeEstimate;
    const result = safeDump({
      sentLastWeek,
      receivedLastWeek,
      sentToday,
      receivedToday,
      lastUpdated: new Date()
    });
    await writeGitHubFile(
      "AnandChowdhary/life-data",
      "emails.yml",
      `📧 ${sentToday} sent, ${receivedToday} received`,
      result
    );
    return res.json({ done: true });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
