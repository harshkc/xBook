import {formatDate} from 'utils/misc'
test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date('December 18, 2021'))).toBe('Dec 21')
})
