import type { Article } from './Article';

export type Site = {
    fetch: () => Promise<Article[]>;
    name: string;
    url: string;
};
