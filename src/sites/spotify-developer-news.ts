import { URL } from 'node:url';
import { Article, Site } from '../types';
import formatDate from '../utils/format-date';
import request from '../utils/request';

const BASE_URL = 'https://developer.spotify.com/community/news/';
const NAME = 'Spotify Developer News';

const cleanDate = (date: string): string => {
    date = date.replace(/(\d+)(st|nd|rd|th)/u, '$1');
    date = date.replace(',', '');

    return date;
};

const fetch = async (): Promise<Article[]> => {
    const $ = await request(BASE_URL);
    const articles = $('.posts-wrapper article').toArray();

    return articles.map((article) => {
        const $article = $(article);

        const [, ...dateParts] = $article.find('.post-date').text().split(' ');
        const link = $article.find('.post-title').attr('href') ?? '';
        const date = cleanDate(dateParts.join(' '));

        return {
            date: formatDate(date, 'MMMM d yyyy'),
            description: $article.find('.post-excerpt').text().trim(),
            link: new URL(link, BASE_URL).toString(),
            title: $article.find('h1').text().trim(),
        };
    });
};

export const spotifyDeveloperNews: Site = {
    fetch,
    name: NAME,
    url: BASE_URL,
};
