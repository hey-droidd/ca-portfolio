/**
 * YouTube helpers - RSS feed only, no API key required.
 *
 * Fetches the channel's public RSS feed at build time:
 * https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
 *
 * Thumbnails via: https://img.youtube.com/vi/{id}/hqdefault.jpg
 * No YouTube Data API v3, no API key, no risk of a debug message in production.
 *
 * Channel: @cashwetaverma
 * Channel ID: UCAcXwJfjmcIyHb0QaYrvTwA
 */

export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  description: string;
  link: string;
}

const CHANNEL_ID = 'UCAcXwJfjmcIyHb0QaYrvTwA';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/**
 * Parses a YouTube RSS <entry> text block to extract fields.
 * The RSS feed is Atom XML; we use simple regex extraction to avoid
 * a DOM/XML parser dependency at build time.
 */
function parseEntry(entry: string): VideoItem | null {
  const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
  const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
  const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
  const descriptionMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);

  if (!idMatch) return null;

  const id = idMatch[1].trim();
  const title = titleMatch?.[1]?.trim() ?? '';
  const publishedAt = publishedMatch?.[1]?.trim() ?? '';
  const raw = descriptionMatch?.[1]?.trim() ?? '';
  const description = raw.slice(0, 140) + (raw.length > 140 ? '…' : '');

  return {
    id,
    title,
    thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    publishedAt,
    description,
    link: `https://www.youtube.com/watch?v=${id}`,
  };
}

/**
 * Fetch the latest N videos from the channel's public RSS feed.
 * Called at Astro build time - no client-side fetch, no API key.
 */
export async function getRecentVideos(maxResults = 8): Promise<VideoItem[]> {
  try {
    const res = await fetch(RSS_URL, {
      headers: { 'Accept': 'application/atom+xml, application/xml, text/xml' },
    });
    if (!res.ok) {
      console.warn(`[youtube] RSS fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const xml = await res.text();

    // Split on <entry> tags
    const entries = xml.split('<entry>').slice(1);
    const videos: VideoItem[] = [];

    for (const entry of entries) {
      const video = parseEntry(entry);
      if (video) videos.push(video);
      if (videos.length >= maxResults) break;
    }

    return videos;
  } catch (err) {
    console.error('[youtube] getRecentVideos error:', err);
    return [];
  }
}

/** Format ISO date to readable string in en-IN locale */
export function formatVideoDate(iso: string): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}
