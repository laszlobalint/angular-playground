export function roundDate(date: Date): Date {
  const ms = 1000 * 60 * 30;
  const roundedDate: Date = new Date(Math.round(date.getTime() / ms) * ms);
  return roundedDate;
}
