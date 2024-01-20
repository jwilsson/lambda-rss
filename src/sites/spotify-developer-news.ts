import { URL } from 'node:url';
import { Article, Site } from '../types';
import { formatDate } from '../utils/format-date';
import { request } from '../utils/request';

const BASE_URL = 'https://developer.spotify.com/community';
const NAME = 'Spotify Developer News';

const fetch = async (): Promise<Article[]> => {
    const $ = await request(BASE_URL);
    const articles = $('main [role="listitem"]').toArray();

    return articles.map((article) => {
        const $article = $(article);
        const $date = $article.find('b');
        const $link = $article.find('a');
        const $type = $article.find('[type]');

        const date = $date.text().trim();
        const title = $link.text().trim();
        const type = $type.text().trim();
        const url = $link.attr('href') ?? '';

        return {
            date: formatDate(date, 'MMMM d, yyyy'),
            description: `${type} - ${title}`,
            link: new URL(url, BASE_URL).toString(),
            title,
        };
    });
};

export const spotifyDeveloperNews: Site = {
    fetch,
    name: NAME,
    url: BASE_URL,
};
