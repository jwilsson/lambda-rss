export interface Article {
    date: string;
    description: string;
    link: string;
    title: string;
};

export interface Site {
    fetch: () => Promise<Article[]>;
    name: string;
    url: string;
};
