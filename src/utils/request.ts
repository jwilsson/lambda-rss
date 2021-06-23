import cheerio, { CheerioAPI } from 'cheerio';
import got from 'got';

export default async (url: string): Promise<CheerioAPI> => {
    const { body } = await got(url);

    return cheerio.load(body);
};
