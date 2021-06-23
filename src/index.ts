import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import sanitizeFilename from 'sanitize-filename';
import path from 'path';
import fs from 'fs';

import { Site } from './types';

exports.handler = async ({ queryStringParameters }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { site = '' } = queryStringParameters ?? {};
    const sitePath = path.resolve(__dirname, `./sites/${sanitizeFilename(site)}.js`);

    try {
        fs.statSync(sitePath);
    } catch {
        return {
            body: '',
            isBase64Encoded: false,
            statusCode: 400,
        };
    }

    const { fetch, name, url }: Site = await import(sitePath);
    const posts = await fetch();
    const body = `
        <?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>${name}</title>
                <description>${name}</description>
                <link>${url}</link>
                <ttl>720</ttl>
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
