const buildSearchQuery = (
  entity: string,
  filters: any = null,
  sort: any = null,
  text: any = null,
  currentPage: any = null,
  itemsPerPage: any = null
) => {
  const filtersParams = filters
    ? filters.filter((item: any) => {
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

  const params: any = new URLSearchParams();

  queryParams.forEach((item) => {
    params.append(Object.keys(item), Object.values(item));
  });

  return `/${entity}?${params.toString()}`;
};

export default buildSearchQuery;
