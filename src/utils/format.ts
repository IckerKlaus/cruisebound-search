/*

Formats a date range into a string like "Sep 14 - 21, 2022". 
- Used in the SailingCard component to display departure and return dates. 
  It ensures consistency in how date ranges are shown throughout the UI.

*/

export function formatDateRange(startDateStr: string, endDateStr: string): string {
  const startDate = new Date(startDateStr + "T00:00:00Z");
  const endDate = new Date(endDateStr + "T00:00:00Z");

  const month = startDate.toLocaleString('en-US', { month: 'short' });
  const startDay = startDate.getUTCDate();
  const endDay = endDate.getUTCDate();
  const year = endDate.getUTCFullYear();

  return `${month} ${startDay} - ${endDay}, ${year}`;
}
