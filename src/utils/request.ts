import cheerio, { Root } from 'cheerio';
import got from 'got';

export default async (url: string): Promise<Root> => {
    const { body } = await got(url);

    return cheerio.load(body);
};
