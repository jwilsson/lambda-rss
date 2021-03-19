const cheerio = require('cheerio');
const got = require('got');

module.exports = async (url) => {
    const { body } = await got(url);

    return cheerio.load(body);
};
