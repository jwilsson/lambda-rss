import { load, type CheerioAPI } from 'cheerio';
import got from 'got';

export default async (url: string): Promise<CheerioAPI> => {
    const { body } = await got(url);

    return load(body);
};
