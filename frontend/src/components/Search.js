import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="flex items-center mb-4 border rounded-lg">
      <input
        type="text"
        placeholder="Search videos"
        value={searchTerm}
        onChange={handleInputChange}
        className="flex-1 px-4 py-2 rounded-lg focus:outline-none"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="px-2 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Search;
