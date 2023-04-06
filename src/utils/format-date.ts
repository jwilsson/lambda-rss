import { DateTime } from 'luxon';

export default (date: string, fromFormat: string): string => {
    return DateTime.fromFormat(date, fromFormat).toRFC2822() ?? '';
};
