const cleanSpotifyArtistResponse = (artist: SpotifyApi.ArtistObjectFull) => {
  delete artist.followers;
  delete artist.external_urls;
  delete artist.popularity;
  return artist;
};

const cleanSpotifyTrackResponse = (track: SpotifyApi.TrackObjectFull) => {
  delete track.type;
  delete track.external_ids;
  delete track.popularity;
  delete track.available_markets;
  delete track.disc_number;
  delete track.duration_ms;
  delete track.external_urls;
  delete track.id;
  delete track.is_playable;
  delete track.linked_from;
  delete track.track_number;
  delete track.uri;
  delete track.external_ids;
  delete track.album.album_type;
  delete track.album.available_markets;
  delete track.album.external_urls;
  delete track.album.id;
  delete track.type;
  delete track.uri;
  return track;
};

export const cleanSpotifyArtistsResponse = (
  artists: SpotifyApi.ArtistObjectFull[]
) => {
  return artists.map(artist => cleanSpotifyArtistResponse(artist));
};

export const cleanSpotifyTracksResponse = (
  tracks: SpotifyApi.TrackObjectFull[]
) => {
  return tracks.map(track => cleanSpotifyTrackResponse(track));
};
