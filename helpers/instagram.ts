import {
  ReelsMediaFeedResponseItem,
  HighlightsRepositoryHighlightsTrayResponseTrayItem,
  ReelsMediaFeedResponseImageVersions2
} from "instagram-private-api";

const safeLocations = (locations: any) =>
  (locations || []).map((data: any) => ({
    name: data.location.name,
    address: data.location.address,
    city: data.location.city,
    shortName: data.location.short_name,
    latitude: data.location.lat,
    longitude: data.location.lng,
    facbookPlace: data.location.facebook_places_id
  }));

const safeImages = (images: ReelsMediaFeedResponseImageVersions2) =>
  (images || {}).candidates || [];

export const safeHighlight = (
  highlight: HighlightsRepositoryHighlightsTrayResponseTrayItem
) => ({
  id: highlight.id,
  title: highlight.title,
  cover: highlight.cover_media.cropped_image_version.url
});

export const safeResult = (result: ReelsMediaFeedResponseItem) => ({
  date: new Date(result.taken_at * 1000),
  id: result.id,
  media_type: result.media_type,
  originalWidth: result.original_width,
  originalHeight: result.original_height,
  viewerCount: (result as any).viewer_count,
  story_locations: safeLocations((result as any).story_locations),
  highlightId: (result as any).highlight_reel_ids || [],
  images: safeImages(result.image_versions2)
});
