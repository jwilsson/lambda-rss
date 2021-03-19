const { URL } = require('url');

const formatDate = require('../utils/format-date');
const request = require('../utils/request');

const BASE_URL = 'https://developer.spotify.com/community/news/';
const NAME = 'Spotify Developer News';

const cleanDate = (date) => {
    date = date.replace(/st|nd|rd|th/, '');
    date = date.replace(',', '');

    return date;
};

const fetch = async () => {
    const $ = await request(BASE_URL);

    const posts = $('.posts-wrapper article').toArray().map((article) => {
        const $article = $(article);

        const [_, ...dateParts] = $article.find('.post-date').text().split(' ');
        const link = $article.find('.post-title').attr('href');
        const date = cleanDate(dateParts.join(' '));

        return {
            date: formatDate(date, 'MMMM dd yyyy'),
            description: $article.find('.post-excerpt').text().trim(),
            link: new URL(link, BASE_URL),
            title: $article.find('h1').text().trim(),
        };
    });

    return {
        name: NAME,
        posts,
        url: BASE_URL,
    };
};

module.exports = {
    fetch,
};
