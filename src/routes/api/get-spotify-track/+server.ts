import dayjs from "dayjs";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";

dayjs.extend(isSameOrBefore);

const spotify = SpotifyApi.withClientCredentials(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);

export async function GET({ url }) {
	const id = url.searchParams.get("id");

	if (!id) {
		throw new Error("No ID provided");
	}

	const track = await spotify.tracks.get(id);

	return Response.json(track);
}
