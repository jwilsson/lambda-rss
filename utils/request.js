import cheerio from 'cheerio';
import got from 'got';

export default async (url) => {
    const { body } = await got(url);

    return cheerio.load(body);
};
