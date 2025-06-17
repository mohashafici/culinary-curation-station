
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-300 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for meals (e.g., chicken, pasta, beef...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder-orange-200 focus:border-orange-400 focus:ring-orange-400"
        />
        {query && (
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Button
        type="submit"
        disabled={!query.trim() || isLoading}
        className="mt-3 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
      >
        {isLoading ? 'Searching...' : 'Search Meals'}
      </Button>
    </form>
  );
};

export default SearchBar;
