import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import rss from './rss';

export const handler = async ({
    queryStringParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { s = '' } = queryStringParameters ?? {};
    const body = await rss(s);

    return {
        body,
        headers: {
            'Content-Type': body ? 'application/rss+xml' : 'text/plain',
        },
        isBase64Encoded: false,
        statusCode: body ? 200 : 400,
    };
};
