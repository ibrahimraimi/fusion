import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod4 as zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { songs, covers } from '$lib/server/db/schema';
import { getTrack, getTrackAudioFeatures, searchTracks } from '$lib/server/spotify';
import { slugifyCover, removeSongExtraText } from '$lib/helpers';
import { eq } from 'drizzle-orm';

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
			let features: any = {
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

			try {
				features = await getTrackAudioFeatures(id);
			} catch (e) {
				console.log(`[Spotify] Audio features restricted for track ${id}. Using default values.`);
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
				valence: features.valence,
				previewUrl: track.preview_url
			};
		};

		try {
			const originalRow = await formatSongRow(originalId);
			const coverRow = await formatSongRow(coverId);

			await db.insert(songs).values(originalRow).onConflictDoNothing();
			await db.insert(songs).values(coverRow).onConflictDoNothing();

			const baseSlug = slugifyCover(originalRow.name, originalRow.artists[0]);
			let slug = baseSlug;
			let counter = 1;

			while (true) {
				const existing = await db.select({ id: covers.id }).from(covers).where(eq(covers.slug, slug)).limit(1);
				if (existing.length === 0) break;
				slug = `${baseSlug}-${counter}`;
				counter++;
			}

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
