import { NowRequest, NowResponse } from "@now/node";
import { writeGitHubFile } from "../helpers/github";
import SpotifyAPI from "spotify-web-api-node";

const spotify = new SpotifyAPI({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "https://anandchowdhary.com/test-callback",
  accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

export default async (req: NowRequest, res: NowResponse) => {
  try {
    await writeGitHubFile(
      "AnandChowdhary/life-data",
      "top-artists.yml",
      "This is the content"
    );
    // const data = await spotify.refreshAccessToken();
    // spotify.setAccessToken(data.body.access_token);
    // const longTermArtists = (
    //   await spotify.getMyTopArtists({
    //     time_range: "long_term"
    //   })
    // ).body.items;
    // const mediumTermArtists = (
    //   await spotify.getMyTopArtists({
    //     time_range: "medium_term"
    //   })
    // ).body.items;
    // const shortTermArtists = (
    //   await spotify.getMyTopArtists({
    //     time_range: "short_term"
    //   })
    // ).body.items;
    // const spotifyArtists = JSON.stringify(
    //   {
    //     longTermArtists,
    //     mediumTermArtists,
    //     shortTermArtists
    //   },
    //   null,
    //   2
    // );
    res.json({ done: true });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
};
