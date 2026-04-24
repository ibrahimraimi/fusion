import { json } from '@sveltejs/kit';
import { searchTracks } from '$lib/server/spotify';

export const GET = async ({ url }) => {
	const query = url.searchParams.get('q');
	if (!query) return json({ results: [] });

	try {
		const results = await searchTracks(query);
		return json({ results });
	} catch (e) {
		console.error(e);
		return json({ results: [] }, { status: 500 });
	}
};
