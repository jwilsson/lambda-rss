import { Site } from '../types';

import { spotifyDeveloperNews } from './spotify-developer-news';

export const sites: { [key: string]: Site } = {
    'spotify-developer-news': spotifyDeveloperNews,
};
