import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sites } from './sites';

exports.handler = async ({
    queryStringParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { s = '' } = queryStringParameters ?? {};
    const site = sites.get(s);

    if (!site) {
        return {
            body: '',
            isBase64Encoded: false,
            statusCode: 400,
        };
    }

    const { fetch, name, url } = site;
    const posts = await fetch();
    const body = `
        <?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>${name}</title>
                <description>${name}</description>
                <link>${url}</link>
                <ttl>720</ttl>
                ${posts
                    .map(
                        (post) => `
                    <item>
                        <title>${post.title}</title>
                        <description>${post.description}</description>
                        <guid>${post.link}</guid>
                        <link>${post.link}</link>
                        <pubDate>${post.date}</pubDate>
                    </item>
                `,
                    )
                    .join('')}
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
