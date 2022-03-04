import { SearchIcon } from "@heroicons/react/outline";

export default function Search({ query, handleSearch }) {
  return (
    <div className="mt-1 rounded-md shadow-sm relative">
      <input
        type="text"
        name="searchBar"
        className="focus:ring-gold-500 focus:border-gold-500 block text-gray-900 w-full py-4 pr-10 sm:text-sm lg:text-lg border-gray-300 rounded-md"
        placeholder="Enter A Confirmation Number..."
        value={query}
        onChange={handleSearch}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <SearchIcon className="h-7 w-7 text-gray-400" />
      </div>
    </div>
  );
}
