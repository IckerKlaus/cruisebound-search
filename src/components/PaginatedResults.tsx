'use client'; // For using React hooks in a client component

// To manage URL and page navigation
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Sailing } from '@/types/sailing';
import SailingCard from './SailingCard';
import PaginationControls from './PaginationControls';
import SortDropdown from './SortDropdown';

export default function PaginatedResults({ sailings }: { sailings: Sailing[] }) {
  const itemsPerPage = 10; // Number of results per page
  const searchParams = useSearchParams(); // Detect current page from URL query params
  const router = useRouter();

  const pageFromURL = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const [sortOption, setSortOption] = useState('price-asc');

  // Ensure the UI reflects changes in the URL
  useEffect(() => {
    setCurrentPage(pageFromURL);
  }, [pageFromURL]);

  // Updates the URL when the user navigates between pages
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  // Changes the sorting option and resets to page 1
  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSortOption('price-asc');
    setCurrentPage(1);
    router.push('/');
  };

  // Sort sailings based on price, date, or duration depending on sortOption
  const sortedSailings = [...sailings].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'date-asc':
        return new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();
      case 'date-desc':
        return new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime();
      case 'duration-asc':
        return a.duration - b.duration;
      case 'duration-desc':
        return b.duration - a.duration;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedSailings.length / itemsPerPage);
  
  // Applies actual pagination by slicing the sorted array
  const currentSailings = sortedSailings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Top controls: title, reset and sort */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl text-black font-semibold">{sailings.length} trips found</h1>
          <button
            onClick={handleResetFilters}
            className="text-sm text-black px-3 py-1 border border-gray-400 rounded hover:bg-gray-100">
            Reset filters
          </button>
        </div>

        <div className="text-sm text-black flex items-center gap-2">
          <span className="font-medium">Sort by</span>
          <SortDropdown value={sortOption} onChange={handleSortChange} />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {currentSailings.map((sailing, index) => (
          <SailingCard key={index} sailing={sailing} /> 
        ))}
      </div>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}/>
    </div>
  );
}
