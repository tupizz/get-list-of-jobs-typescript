import { parse } from 'date-fns';

export class DateUtils {
  static getParsedDate(date: string): Date {
    return parse(date, 'yyyy-MM-dd kk:mm:ss', new Date(date));
  }
}
