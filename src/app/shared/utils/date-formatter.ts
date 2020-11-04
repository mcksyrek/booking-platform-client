export function dateFormatter(date: Date): string {
  if (!date) {
    // TODO mat-dialog-close calls that on init with no-date value
    return null;
  }
  const day = date.getDay() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
