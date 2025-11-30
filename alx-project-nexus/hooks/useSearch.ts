import { useState, useMemo } from 'react';

export const useSearch = <T extends { [key: string]: any }>(
  data: T[],
  key: string
) => {
  const [query, setQuery] = useState('');

  const filterData = useMemo(() => {
    if (!query) return data;
    return data.filter((item) =>
      item[key].toString().toLowerCase().includes(query.toLowerCase())
    );
  }, [data, key, query]);
  return { query, setQuery, filterData };
};
