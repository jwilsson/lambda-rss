import { URL } from 'url';

import formatDate from '../utils/format-date';
import request from '../utils/request';

import { Article } from '../types';

const cleanDate = (date: string): string => {
    date = date.replace(',', '');

    return date;
};

export const url = 'https://developer.spotify.com/community/news/';
export const name = 'Spotify Developer News';

export const fetch = async (): Promise<Article[]> => {
    const $ = await request(url);

    return $('.posts-wrapper article').toArray().map((article) => {
        const $article = $(article);

        const [_, ...dateParts] = $article.find('.post-date').text().split(' ');
        const link = $article.find('.post-title').attr('href') ?? '';
        const date = cleanDate(dateParts.join(' '));

        return {
            date: formatDate(date, 'MMMM d yyyy'),
            description: $article.find('.post-excerpt').text().trim(),
            link: new URL(link, url).toString(),
            title: $article.find('h1').text().trim(),
        };
    });
};
