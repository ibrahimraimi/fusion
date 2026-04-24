import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { env } from '$env/dynamic/private';

let spotifyApi: SpotifyApi | null = null;

export function getSpotifyApi() {
	if (!spotifyApi) {
		if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET) {
			throw new Error('SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is not set in environment variables');
		}
		spotifyApi = SpotifyApi.withClientCredentials(
			env.SPOTIFY_CLIENT_ID,
			env.SPOTIFY_CLIENT_SECRET
		);
	}
	return spotifyApi;
}

export async function getTrack(trackId: string) {
	const api = getSpotifyApi();
	return await api.tracks.get(trackId);
}

export async function getTrackAudioFeatures(trackId: string) {
	const api = getSpotifyApi();
	return await api.tracks.audioFeatures(trackId);
}

export async function searchTracks(query: string, limit = 10) {
	const api = getSpotifyApi();
	const results = await api.search(query, ['track'], undefined, limit as any);
	return results.tracks.items;
}
