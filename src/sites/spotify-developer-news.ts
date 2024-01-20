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
        const $link = $article.find('a');

        const date = formatDate($article.find('b').text(), 'MMMM d, yyyy');
        const type = $article.find('[type]').text().trim();
        const url = $link.attr('href') ?? '';
        const title = $link.text().trim();

        return {
            date,
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
