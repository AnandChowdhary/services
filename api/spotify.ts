import { NowRequest, NowResponse } from "@now/node";
import { writeGitHubFile } from "../helpers/github";
import SpotifyAPI from "spotify-web-api-node";
import { safeDump } from "js-yaml";
import {
  cleanSpotifyArtistsResponse,
  cleanSpotifyTracksResponse
} from "../helpers/spotify";

const spotify = new SpotifyAPI({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "https://anandchowdhary.com/test-callback",
  accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const data = await spotify.refreshAccessToken();
    spotify.setAccessToken(data.body.access_token);
    if (!req.query.tracks) {
      const longTermArtists = cleanSpotifyArtistsResponse(
        (
          await spotify.getMyTopArtists({
            time_range: "long_term"
          })
        ).body.items
      );
      const mediumTermArtists = cleanSpotifyArtistsResponse(
        (
          await spotify.getMyTopArtists({
            time_range: "medium_term"
          })
        ).body.items
      );
      const shortTermArtists = cleanSpotifyArtistsResponse(
        (
          await spotify.getMyTopArtists({
            time_range: "short_term"
          })
        ).body.items
      );
      await writeGitHubFile(
        "AnandChowdhary/life-data",
        "top-artists.yml",
        "🎵 Update Spotify top artists data",
        safeDump({
          longTermArtists,
          mediumTermArtists,
          shortTermArtists
        })
      );
    }
    const longTermTracks = cleanSpotifyTracksResponse(
      (
        await spotify.getMyTopTracks({
          time_range: "long_term"
        })
      ).body.items
    );
    const mediumTermTracks = cleanSpotifyTracksResponse(
      (
        await spotify.getMyTopTracks({
          time_range: "medium_term"
        })
      ).body.items
    );
    const shortTermTracks = cleanSpotifyTracksResponse(
      (
        await spotify.getMyTopTracks({
          time_range: "short_term"
        })
      ).body.items
    );
    await writeGitHubFile(
      "AnandChowdhary/life-data",
      "top-tracks.yml",
      "🎵 Update Spotify top tracks data",
      safeDump({
        longTermTracks,
        mediumTermTracks,
        shortTermTracks
      })
    );
    res.json({ done: true });
  } catch (error) {
    res.status(500);
    res.json({ error: "Unable to add Spotify data" });
  }
};
