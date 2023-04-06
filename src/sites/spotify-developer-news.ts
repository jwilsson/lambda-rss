import { URL } from 'node:url';
import { Article, Site } from '../types';
import formatDate from '../utils/format-date';
import request from '../utils/request';

const BASE_URL = 'https://developer.spotify.com/community';
const NAME = 'Spotify Developer News';

const cleanDate = (date: string): string => date.replace(',', '');

const fetch = async (): Promise<Article[]> => {
    const $ = await request(BASE_URL);
    const articles = $('main [role="listitem"]').toArray();

    return articles.map((article) => {
        const $article = $(article);
        const $link = $article.find('a');
        const $date = $article.find('b');

        const date = cleanDate($date.text());
        const url = $link.attr('href') ?? '';
        const title = $link.text().trim();

        return {
            date: formatDate(date, 'MMMM d yyyy'),
            description: title,
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
