/* 
This component allows reusing the pagination control 
in any other list in the project 
*/

'use client'; // For using React hooks in a client component

// Defines the props, like current page, total pages, and function to change page
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {

  // Generates page buttons and uses "..." if there are many
  const renderPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Include pages 1 to 4
    for (let i = 1; i <= 4; i++) {
      pages.push(i);
    }

    // Show current page if it's between 5 and totalPages - 1
    if (currentPage >= 5 && currentPage < totalPages - 1) {
      pages.push(currentPage);
    }

    // Show the last 2 pages if we are near the end
    if (currentPage >= totalPages - 1) {
      pages.push(totalPages - 1);
      pages.push(totalPages);
    } else {
      // If not near the end, show "..." and the last page
      if (!pages.includes(totalPages)) {
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return Array.from(new Set(pages));
  };

  const pages = renderPages();

  return (
    <div className="mt-10">
      <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md w-fit">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-400 disabled:opacity-40">
          ‹
        </button>

        {pages.map((page, index) =>
          page === '...' ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(Number(page))}
              className={`px-3 py-1 rounded-full ${currentPage === page ? 'bg-white text-black font-semibold' : 'text-black'}`}>
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-blue-500 disabled:opacity-40">
          ›
        </button>
      </div>
    </div>
  );
}
