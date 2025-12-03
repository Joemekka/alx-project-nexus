import { CiFilter } from 'react-icons/ci';
import React, { useState } from 'react';
import { ProductsItem, ProductProp } from '@/interfaces';

interface FilterProps extends ProductsItem {
  onFilter: (filtered: ProductProp[]) => void;
}

const Filter: React.FC<FilterProps> = ({ data, onFilter }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const sortLowToHigh = () => {
    const sorted = [...data].sort((a, b) => Number(a.price) - Number(b.price));
    onFilter(sorted);
    setOpenDropdown(false);
  };

  const sortHighToLow = () => {
    const sorted = [...data].sort((a, b) => Number(b.price) - Number(a.price));
    onFilter(sorted);
    setOpenDropdown(false);
  };

  return (
    <div className="relative">
      {/* Filter Icon */}
      <CiFilter
        className="text-3xl cursor-pointer"
        onClick={() => setOpenDropdown((prev) => !prev)}
      />

      {/* Dropdown */}
      {openDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
          <button
            onClick={sortLowToHigh}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Price: Low → High
          </button>

          <button
            onClick={sortHighToLow}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Price: High → Low
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
