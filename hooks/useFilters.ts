import { useState } from "react";

export const useFilters = (extraFilters = {}) => {

  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 10,
    ...extraFilters
  });

  return { filters, setFilters };
};
