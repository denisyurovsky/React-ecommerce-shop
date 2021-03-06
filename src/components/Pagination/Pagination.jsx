import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import React from 'react';

export default function PaginationBlock({
  pageCount,
  setSearchParams,
  className,
  currentPage,
}) {
  const handleChange = (event, value) => {
    setSearchParams((prev) => ({
      ...prev,
      currentPage: value,
    }));
  };

  if (!pageCount) return null;

  return (
    <Stack spacing={2} className={className}>
      <Pagination
        color="primary"
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}

PaginationBlock.propTypes = {
  setSearchParams: PropTypes.func.isRequired,
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  className: PropTypes.string,
};
