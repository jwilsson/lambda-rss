const { DateTime } = require('luxon');
const cheerio = require('cheerio');
const { URL } = require('url');
const got = require('got');

const BASE_URL = 'https://developer.spotify.com/community/news/';

const cleanDate = (date) => {
    date = date.replace(/st|nd|rd|th/, '');
    date = date.replace(',', '');

    return date;
};

const fetchPosts = async (url) => {
    const { body } = await got(url);
    const $ = cheerio.load(body);

    return $('.posts-wrapper article').toArray().map((article) => {
        const $article = $(article);
        const [_, ...dateParts] = $article.find('.post-date').text().split(' ');

        const link = $article.find('.post-title').attr('href');
        const date = cleanDate(dateParts.join(' '));

        return {
            date: DateTime.fromFormat(date, 'MMMM dd yyyy').toRFC2822(),
            description: $article.find('.post-excerpt').text().trim(),
            link: new URL(link, BASE_URL),
            title: $article.find('h1').text().trim(),
        };
    });
};

exports.handler = async () => {
    const posts = await fetchPosts(BASE_URL);

    const body = `
        <?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>Spotify Developer News</title>
                <description>Spotify Developer News</description>
                <link>${BASE_URL}</link>
                <ttl>60</ttl>
                ${posts.map((post) => `
                    <item>
                        <title>${post.title}</title>
                        <description>${post.description}</description>
                        <guid>${post.link}</guid>
                        <link>${post.link}</link>
                        <pubDate>${post.date}</pubDate>
                    </item>
                `).join('')}
            </channel>
        </rss>
    `.trim();

    return {
        body,
        headers: {
            'Content-Type': 'application/rss+xml',
        },
        isBase64Encoded: false,
        statusCode: 200,
    };
};
