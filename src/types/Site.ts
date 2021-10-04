import { Article } from './Article';

export interface Site {
    fetch: () => Promise<Article[]>;
    name: string;
    url: string;
}
