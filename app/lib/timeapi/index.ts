import type { TimeApiResponse } from './types';

// Minimal wrapper around a public timezone API (worldtimeapi.org)
// Returns typed result or a fallback mocked value on error.
export async function getCurrentTime(timezone?: string): Promise<TimeApiResponse> {
  const tz = timezone || 'Etc/UTC';
  try {
    const res = await fetch(`https://worldtimeapi.org/api/timezone/${encodeURIComponent(tz)}`);
    if (!res.ok) throw new Error('Time API error');
    const json = (await res.json()) as TimeApiResponse;
    return json;
  } catch (err) {
    // Fallback mocked response to keep app usable offline
    const now = new Date().toISOString();
    return {
      datetime: now,
      timezone: tz,
      utc_offset: '+00:00',
      abbreviation: 'UTC',
    } as TimeApiResponse;
  }
}
