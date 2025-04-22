// components/SearchBar.tsx
import React from 'react';

interface Props {
  searchTerm: string;
  onChange: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Pokémon..."
        className="w-full sm:w-1/2 mx-auto block px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SearchBar;
