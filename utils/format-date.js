import { DateTime } from 'luxon';

export default (date, format) => {
    return DateTime.fromFormat(date, format).toRFC2822();
};
