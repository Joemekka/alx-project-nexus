import React from 'react';
import { useSearch } from '@/hooks/useSearch';
import { ProductAllProp } from '@/interfaces';
import { Search as SearchIcon } from 'lucide-react';
import { routeToDest } from '@/utils/pageRoute';

const Search = ({ products }: ProductAllProp) => {
  const { query, setQuery, filterData } = useSearch(products, 'product');
  return (
    <div>
      <form className="flex items-center backdrop-filter bg-[#c6c7c9ae]  backdrop-blur-sm border border-white/45 rounded-full py-[0.2rem] overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 indent-5! bg-grey  placeholder:text-sm focus:outline-0 "
          placeholder="Search furniture"
        />

        <SearchIcon
          className={`text-(--primaryColor) border bg-(--secondryColor) rounded-full p-1 mr-0.5`}
        />
      </form>
      {query && (
        <ul className="backdrop-filter mt-1.5 bg-[#4a4b4dae]  backdrop-blur-sm border border-white/45 rounded-md flex flex-col items-start p-5">
          {filterData.length > 0 ? (
            filterData.map((product) => (
              <li
                className="hover:text-(--secondryColor) cursor-pointer"
                key={product.id}
                onClick={routeToDest(`/products/${product.id}`)}
              >
                {product.product}
              </li>
            ))
          ) : (
            <div className=" w-full">
              <li className="text-center w-full">No Result Found</li>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
