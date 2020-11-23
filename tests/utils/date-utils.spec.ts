import { getParsedDate } from '../../src/utils/date-utils';

describe('Date Utils', () => {
  test('Given a valid date as string should return a parsed date object in utc timezone', () => {
    const date = getParsedDate('2019-11-10 12:00:00');
    expect(date).toStrictEqual(new Date('2019-11-10T15:00:00.000Z'));
  });
});
