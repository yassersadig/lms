import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Filter = ({ onFilter }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onFilter(rating);
  };

  const clearFilter = () => {
    setSelectedRating(null);
    onFilter(null);
  };

  return (
    <div className="bg-white border rounded-lg p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <Disclosure>
        {({ open }) => (
          <div>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <span>
                {selectedRating
                  ? `${selectedRating} star${
                      selectedRating !== 1 ? "s" : ""
                    } or more`
                  : "Rating"}
              </span>
              <ChevronDownIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="radio"
                      id={`rating-${rating}`}
                      checked={selectedRating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="mr-2"
                    />
                    <label htmlFor={`rating-${rating}`}>
                      {rating} star{rating !== 1 && "s"} or more
                    </label>
                  </div>
                ))}
                {selectedRating && (
                  <button
                    onClick={clearFilter}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default Filter;
