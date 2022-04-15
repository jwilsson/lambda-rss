import type { Site } from '../types';
import { spotifyDeveloperNews } from './spotify-developer-news';

export const sites = new Map<string, Site>([
    ['spotify-developer-news', spotifyDeveloperNews],
]);
