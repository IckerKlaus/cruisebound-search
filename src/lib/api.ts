import { Sailing } from '@/types/sailing';

// Fetches the list of sailings (cruise trips) from the Cruisebound sandbox API
export async function fetchSailings(): Promise<Sailing[]> {
  const res = await fetch('https://sandbox.cruisebound-qa.com/sailings', {
    cache: 'no-store',
  });
  const data = await res.json();
  return data.results;
}
