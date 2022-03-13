const getFiltersFromQuery = (queryObj) => {
  const filters = [{ isDiscounted: queryObj.isDiscounted === 'true' }];

  if ('category.name' in queryObj) {
    filters.push({ 'category.name': queryObj['category.name'] });
  }

  return filters;
};

const convertUrlParametersToObj = (url) => {
  return JSON.parse(
    '{"' +
      decodeURI(url.split('?')[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

export default (url) => {
  if (!url) {
    return null;
  }

  const tempObjFromQuery = convertUrlParametersToObj(url);

  if (!tempObjFromQuery) {
    return null;
  }

  return {
    entity: 'products',
    currentPage: Number(tempObjFromQuery._page),
    q: tempObjFromQuery.q ?? undefined,
    filters: getFiltersFromQuery(tempObjFromQuery),
    itemsPerPage: Number(tempObjFromQuery._limit),
    sort: { field: tempObjFromQuery._sort, order: tempObjFromQuery._order },
  };
};
