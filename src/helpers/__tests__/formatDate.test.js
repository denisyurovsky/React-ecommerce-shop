import { formatDate } from '../dateUtils';

const date = '2021-10-15T17:06:12.569Z';
const expected = '15.10.2021';

describe('formatDate function', () => {
  it('Correctly format date', () => {
    const actual = formatDate(date);

    expect(actual).toEqual(expected);
  });
});
