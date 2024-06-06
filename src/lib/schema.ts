import { z } from "zod";
import type { Track } from "@spotify/web-api-ts-sdk";

import { MAX_CONTRIBUTOR_CHARS, MAX_DESCRIPTION_CHARS } from "./constants";

export const newCoverSchema = z
	.object({
		original: z.custom<Track>(
			(value) => (value as Track) !== undefined,
			"Please select an original cover"
		),
		cover: z.custom<Track>((value) => (value as Track) !== undefined, "Please select a cover song"),
		description: z
			.string()
			.trim()
			.max(MAX_DESCRIPTION_CHARS, `Description must be shorter ${MAX_DESCRIPTION_CHARS} characters`)
			.optional()
			.default(""),
		contributor: z
			.string()
			.trim()
			.max(MAX_CONTRIBUTOR_CHARS, `Name must be shorter than ${MAX_CONTRIBUTOR_CHARS} characters`)
			.optional()
			.default("")
	})
	.refine(
		(data) => data.cover.id !== data.original.id,
		"Cover and original songs can't be the same"
	);
