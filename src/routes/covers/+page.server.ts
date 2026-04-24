import { db } from '$lib/server/db';
import { covers, songs } from '$lib/server/db/schema';
import { desc, eq, aliasedTable } from 'drizzle-orm';

export const load = async () => {
	const originalSongs = aliasedTable(songs, 'original_songs');
	const coverSongs = aliasedTable(songs, 'cover_songs');

	const allCovers = await db
		.select({
			id: covers.id,
			slug: covers.slug,
			description: covers.description,
			original: {
				name: originalSongs.name,
				artists: originalSongs.artists,
				albumImg: originalSongs.albumImg
			},
			cover: {
				name: coverSongs.name,
				artists: coverSongs.artists,
				albumImg: coverSongs.albumImg
			}
		})
		.from(covers)
		.innerJoin(originalSongs, eq(covers.originalId, originalSongs.id))
		.innerJoin(coverSongs, eq(covers.coverId, coverSongs.id))
		.orderBy(desc(covers.createdAt));

	return {
		covers: allCovers
	};
};
