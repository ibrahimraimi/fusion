import { pgTable, serial, integer, text, timestamp, real, pgEnum } from 'drizzle-orm/pg-core';

export const genderEnum = pgEnum('gender', ['male', 'female', 'non-binary', 'other']);

export const songs = pgTable('songs', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	artists: text('artists').array().notNull(),
	url: text('url').notNull(),
	albumName: text('album_name').notNull(),
	albumYear: integer('album_year').notNull(),
	albumImg: text('album_img').array().notNull(),
	gender: text('gender').array().notNull().default(['other']),
	acousticness: real('acousticness'),
	danceability: real('danceability'),
	energy: real('energy'),
	instrumentalness: real('instrumentalness'),
	liveness: real('liveness'),
	loudness: real('loudness'),
	speechiness: real('speechiness'),
	tempo: real('tempo'),
	valence: real('valence'),
	previewUrl: text('preview_url'),
	createdAt: timestamp('created_at').defaultNow()
});

export const covers = pgTable('covers', {
	id: serial('id').primaryKey(),
	originalId: text('original_id').references(() => songs.id),
	coverId: text('cover_id').references(() => songs.id),
	slug: text('slug').unique().notNull(),
	description: text('description'),
	contributor: text('contributor'),
	tags: text('tags').array(),
	createdAt: timestamp('created_at').defaultNow()
});
