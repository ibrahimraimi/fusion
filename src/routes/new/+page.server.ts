import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod4 as zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { songs, covers } from '$lib/server/db/schema';
import { getTrack, getTrackAudioFeatures, searchTracks } from '$lib/server/spotify';
import { slugifyCover, removeSongExtraText } from '$lib/helpers';

const schema = z.object({
	originalId: z.string().min(1, 'Original song is required'),
	coverId: z.string().min(1, 'Cover song is required'),
	description: z.string().optional(),
	contributor: z.string().optional(),
	tags: z.string().optional() // Comma separated
});

export const load = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

export const actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { originalId, coverId, description, contributor, tags } = form.data;

		const formatSongRow = async (id: string) => {
			const track = await getTrack(id);
			let features: any = {};

			try {
				features = await getTrackAudioFeatures(id);
			} catch (e) {
				console.log(`[Spotify] Audio features restricted for track ${id}. Using default values.`);
				// Provide default values if audio features are restricted/unavailable
				features = {
					acousticness: 0,
					danceability: 0,
					energy: 0,
					instrumentalness: 0,
					liveness: 0,
					loudness: 0,
					speechiness: 0,
					tempo: 0,
					valence: 0
				};
			}

			return {
				id: track.id,
				name: removeSongExtraText(track.name),
				artists: track.artists.map((a) => a.name),
				url: track.external_urls.spotify,
				albumName: track.album.name,
				albumYear: new Date(track.album.release_date).getFullYear(),
				albumImg: track.album.images.map((i) => i.url),
				acousticness: features.acousticness,
				danceability: features.danceability,
				energy: features.energy,
				instrumentalness: features.instrumentalness,
				liveness: features.liveness,
				loudness: features.loudness,
				speechiness: features.speechiness,
				tempo: features.tempo,
				valence: features.valence
			};
		};

		try {
			// Fetch data for both tracks
			const originalTrackData = await getTrack(originalId);
			const coverTrackData = await getTrack(coverId);

			const originalRow = await formatSongRow(originalId);
			const coverRow = await formatSongRow(coverId);

			// Insert songs (on conflict do nothing)
			await db.insert(songs).values(originalRow).onConflictDoNothing();
			await db.insert(songs).values(coverRow).onConflictDoNothing();

			// Generate slug using the helper from the example
			const slug = slugifyCover(coverTrackData.name, coverTrackData.artists[0].name);

			await db.insert(covers).values({
				originalId,
				coverId,
				slug,
				description,
				contributor,
				tags: tags ? tags.split(',').map((t) => t.trim()) : []
			});

			return redirect(303, `/${slug}/cover?new=true`);
		} catch (e) {
			console.error(e);
			return fail(500, { form, message: 'Failed to save cover' });
		}
	}
};
