'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sailing } from '@/types/sailing';
import SailingCard from './SailingCard';
import PaginationControls from './PaginationControls';

export default function PaginatedResults({ sailings }: { sailings: Sailing[] }) {
  const itemsPerPage = 10;
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageFromURL = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const [sortOption, setSortOption] = useState('price-asc');

  useEffect(() => {
    setCurrentPage(pageFromURL);
  }, [pageFromURL]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1); // reset to page 1
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleResetFilters = () => {
  setSortOption('price-asc');
  setCurrentPage(1);
  router.push('/');
  };


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
            className="text-sm text-black px-3 py-1 border border-gray-400 rounded hover:bg-gray-100"
          >
            Reset filters
          </button>
        </div>

        <div className="text-sm text-black flex items-center gap-2">
          <span className="font-medium">Sort by</span>
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded shadow-sm focus:outline-none text-sm"
          >
            <option value="price-asc">Price – Lowest first</option>
            <option value="price-desc">Price – Highest first</option>
            <option value="date-asc">Departure Date – Soonest first</option>
            <option value="date-desc">Departure Date – Latest first</option>
            <option value="duration-asc">Duration – Shortest first</option>
            <option value="duration-desc">Duration – Longest first</option>
          </select>
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
        onPageChange={handlePageChange}
      />
    </div>
  );
}
