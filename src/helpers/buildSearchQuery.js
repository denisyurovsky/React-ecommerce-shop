import _ from 'lodash';

const buildSearchQuery = (
  entity,
  filters = null,
  sort = null,
  text = null,
  currentPage = 1,
  itemsPerPage = 20
) => {
  const filtersParams = filters ? _.merge(...filters) : null;
  const sortParam = sort ? { _sort: sort.field, _order: sort.order } : null;
  const textParams = text ? { q: text } : null;

  const objParams = {
    ...filtersParams,
    ...sortParam,
    ...textParams,
    _page: currentPage,
    _limit: itemsPerPage,
  };
  const params = new URLSearchParams(objParams);

  return `/${entity}?${params.toString()}`;
};

export default buildSearchQuery;
