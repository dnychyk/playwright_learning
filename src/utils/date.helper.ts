export function getExpirationDate(monthsToAdd: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsToAdd);

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${month}/${year}`;
}
