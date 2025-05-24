import { fetchSailings } from '@/lib/api';
import PaginatedResults from '@/components/PaginatedResults';

export default async function SearchResultsPage() {
  const sailings = await fetchSailings();

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <PaginatedResults sailings={sailings} />
    </div>
  );
}
