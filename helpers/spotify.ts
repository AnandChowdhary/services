const cleanSpotifyArtistResponse = (artist: SpotifyApi.ArtistObjectFull) => {
  delete artist.followers;
  delete artist.external_urls;
  delete artist.popularity;
  return artist;
};

export const cleanSpotifyArtistsResponse = (
  artists: SpotifyApi.ArtistObjectFull[]
) => {
  return artists.map(artist => cleanSpotifyArtistResponse(artist));
};
