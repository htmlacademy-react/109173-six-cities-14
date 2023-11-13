import { DateFormat, months } from '../const';

export function getRatingPercent(rating: number) {
  return (100 / 5) * rating;
}

export function getPaddedNum(num: number): string | number {
  return (num < 10) ? `0${num}` : num;
}

export function getMonthName(monthNum: number): string {
  return months[monthNum];
}

export function getFormattedDate(date: Date, format: typeof DateFormat[keyof typeof DateFormat]): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  let formattedDate: string | number = Date.parse(String(date));

  switch(format) {
    case DateFormat.DATE_TIME: {
      formattedDate = `${year}-${getPaddedNum(month)}-${getPaddedNum(day)}`;
      break;
    }

    case DateFormat.MONTH_YEAR: {
      formattedDate = `${getMonthName(month)} ${year}`;
      break;
    }
  }

  return String(formattedDate);
}

export function getRightPluralForm(phrase: string, itemsCount: number) {
  return (itemsCount <= 1) ? phrase : `${phrase}s`;
}
