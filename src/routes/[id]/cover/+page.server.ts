import { db } from '$lib/server/db';
import { covers, songs } from '$lib/server/db/schema';
import { eq, aliasedTable } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const slug = params.id;

	const originalSongs = aliasedTable(songs, 'original_songs');
	const coverSongs = aliasedTable(songs, 'cover_songs');

	const coverData = await db
		.select({
			id: covers.id,
			slug: covers.slug,
			description: covers.description,
			contributor: covers.contributor,
			tags: covers.tags,
			original: {
				name: originalSongs.name,
				artists: originalSongs.artists,
				albumName: originalSongs.albumName,
				albumImg: originalSongs.albumImg,
				acousticness: originalSongs.acousticness,
				danceability: originalSongs.danceability,
				energy: originalSongs.energy,
				instrumentalness: originalSongs.instrumentalness,
				liveness: originalSongs.liveness,
				loudness: originalSongs.loudness,
				speechiness: originalSongs.speechiness,
				tempo: originalSongs.tempo,
				valence: originalSongs.valence,
				previewUrl: originalSongs.previewUrl,
				url: originalSongs.url
			},
			cover: {
				name: coverSongs.name,
				artists: coverSongs.artists,
				albumName: coverSongs.albumName,
				albumImg: coverSongs.albumImg,
				acousticness: coverSongs.acousticness,
				danceability: coverSongs.danceability,
				energy: coverSongs.energy,
				instrumentalness: coverSongs.instrumentalness,
				liveness: coverSongs.liveness,
				loudness: coverSongs.loudness,
				speechiness: coverSongs.speechiness,
				tempo: coverSongs.tempo,
				valence: coverSongs.valence,
				previewUrl: coverSongs.previewUrl,
				url: coverSongs.url
			}
		})
		.from(covers)
		.where(eq(covers.slug, slug))
		.innerJoin(originalSongs, eq(covers.originalId, originalSongs.id))
		.innerJoin(coverSongs, eq(covers.coverId, coverSongs.id))
		.limit(1);

	if (coverData.length === 0) {
		throw error(404, 'Cover not found');
	}

	return {
		cover: coverData[0]
	};
};
