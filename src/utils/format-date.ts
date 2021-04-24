import { DateTime } from 'luxon';

export default (date: string, format: string): string => {
    return DateTime.fromFormat(date, format).toRFC2822();
};
