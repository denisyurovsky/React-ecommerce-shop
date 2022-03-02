const buildSearchQuery = (
  entity,
  filters = null,
  sort = null,
  text = null,
  currentPage = null,
  itemsPerPage = null
) => {
  const filtersParams = filters
    ? filters.filter((item) => {
        return item[Object.keys(item)[0]];
      })
    : [];

  const sortParam = sort ? [{ _sort: sort.field }, { _order: sort.order }] : [];
  const textParam = text ? [{ q: text }] : [];
  const currentPageParam = currentPage ? [{ _page: currentPage }] : [];
  const itemsPerPageParam = itemsPerPage ? [{ _limit: itemsPerPage }] : [];

  const queryParams = [
    ...filtersParams,
    ...sortParam,
    ...textParam,
    ...currentPageParam,
    ...itemsPerPageParam,
  ];

  if (!queryParams.length) {
    return `/${entity}`;
  }

  const params = new URLSearchParams();

  queryParams.forEach((item) => {
    params.append(Object.keys(item), Object.values(item));
  });

  return `/${entity}?${params.toString()}`;
};

export default buildSearchQuery;
