'use client'; // For using React hooks in a client component

import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

// Defines the dropdown options
const options = [
  { id: 'price-asc', category: 'Price', detail: 'Lowest first' },
  { id: 'price-desc', category: 'Price', detail: 'Highest first' },
  { id: 'date-asc', category: 'Departure Date', detail: 'Soonest first' },
  { id: 'date-desc', category: 'Departure Date', detail: 'Latest first' },
  { id: 'duration-asc', category: 'Duration', detail: 'Shortest first' },
  { id: 'duration-desc', category: 'Duration', detail: 'Longest first' },
];

/* 
Defines a component called SortDropdown that receives:
value: the currently selected option (e.g., 'price-asc').
onChange: a function to update the selected option (e.g., handleSortChange from PaginatedResults.tsx).
*/
export default function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  // Finds the option object that matches the current value; if none is found, selects the first option
  const selected = options.find((opt) => opt.id === value) || options[0];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-56">
        <ListboxButton className="w-full border border-gray-300 rounded px-4 py-2 text-left shadow-sm">
          <div className="text-sm font-bold text-black">{selected.category}</div>
          <div className="text-xs text-gray-500 -mt-1">{selected.detail}</div>
          <ChevronDown className="absolute top-2.5 right-3 w-4 h-4 text-gray-500" />
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-2 w-full bg-white border rounded shadow">
          {options.map((opt) => (
            <ListboxOption 
              key={opt.id} 
              value={opt.id} 
              className="px-4 py-2 cursor-pointer"
            >
              <div className="text-sm font-bold text-black">{opt.category}</div>
              <div className="text-xs text-gray-500 -mt-1">{opt.detail}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
