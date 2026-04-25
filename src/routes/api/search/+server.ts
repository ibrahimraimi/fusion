import { json } from '@sveltejs/kit';
import { searchTracks, getTrack } from '$lib/server/spotify';

export const GET = async ({ url }) => {
	const query = url.searchParams.get('q');
	if (!query) return json({ results: [] });

	try {
		// Detect Spotify Track ID or Link
		const trackIdMatch = query.match(/track[/:]([a-zA-Z0-9]{22})/) || query.match(/^([a-zA-Z0-9]{22})$/);
		
		if (trackIdMatch) {
			const trackId = trackIdMatch[1];
			const track = await getTrack(trackId);
			return json({ results: [track] });
		}

		const results = await searchTracks(query);
		return json({ results });
	} catch (e) {
		console.error(e);
		return json({ results: [] }, { status: 500 });
	}
};
