import { Sailing } from '@/types/sailing';

export async function fetchSailings(): Promise<Sailing[]> {
  const res = await fetch('https://sandbox.cruisebound-qa.com/sailings', {
    cache: 'no-store',
  });
  const data = await res.json();
  return data.results;
}
