export function formatDateRange(startDateStr: string, endDateStr: string): string {
  const startDate = new Date(startDateStr + "T00:00:00Z");
  const endDate = new Date(endDateStr + "T00:00:00Z");

  const month = startDate.toLocaleString('en-US', { month: 'short' });
  const startDay = startDate.getUTCDate();
  const endDay = endDate.getUTCDate();
  const year = endDate.getUTCFullYear();

  return `${month} ${startDay} - ${endDay}, ${year}`;
}
