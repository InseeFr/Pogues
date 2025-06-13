import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('fr');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

/**
 * Transform a Date object or ISO 8601 string in a readable string
 * (e.g. '1 minute ago').
 */
export function computeDateFromNow(date: Date | string) {
  return dayjs(date).fromNow();
}

/**
 * Transform a Date object or ISO 8601 string in a localized day string
 * (e.g. '08/16/2018').
 */
export function computeDayFromDate(date: Date | string) {
  return dayjs(date).format('L');
}

/**
 * Transform a Date object or ISO 8601 string in a localized time string
 * (e.g. '8:02 PM').
 */
export function computeTimeFromDate(date: Date | string) {
  return dayjs(date).format('LT');
}

/**
 * Transform a Date object or ISO 8601 string in a localized date string
 * (e.g. 'August 16, 2018 8:02 PM').
 */
export function computeFullDateFromDate(date: Date | string) {
  return dayjs(date).format('LLL');
}
