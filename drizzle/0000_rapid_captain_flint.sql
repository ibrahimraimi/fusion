CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'non-binary', 'other');--> statement-breakpoint
CREATE TABLE "covers" (
	"id" serial PRIMARY KEY NOT NULL,
	"original_id" text,
	"cover_id" text,
	"slug" text NOT NULL,
	"description" text,
	"contributor" text,
	"tags" text[],
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "covers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "songs" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"artists" text[] NOT NULL,
	"url" text NOT NULL,
	"album_name" text NOT NULL,
	"album_year" integer NOT NULL,
	"album_img" text[] NOT NULL,
	"gender" text[] DEFAULT '{"other"}' NOT NULL,
	"acousticness" real,
	"danceability" real,
	"energy" real,
	"instrumentalness" real,
	"liveness" real,
	"loudness" real,
	"speechiness" real,
	"tempo" real,
	"valence" real,
	"preview_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "covers" ADD CONSTRAINT "covers_original_id_songs_id_fk" FOREIGN KEY ("original_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "covers" ADD CONSTRAINT "covers_cover_id_songs_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;