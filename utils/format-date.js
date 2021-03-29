const { DateTime } = require('luxon');

module.exports = (date, format) => {
    return DateTime.fromFormat(date, format).toRFC2822();
};
