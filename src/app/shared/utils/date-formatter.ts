// transforming Date obj into DD/MM/YYYY string
export function dateFormatter(date: Date): string {
  const day = date.getDay() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
