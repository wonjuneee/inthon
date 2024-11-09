export function formatDate(date: Date | null | undefined): string {
  if (!date) return '';

  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
}
