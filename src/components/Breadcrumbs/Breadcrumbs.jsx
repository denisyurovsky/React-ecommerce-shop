import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import React from 'react';

export default function BasicBreadcrumbs({ links, className }) {
  return (
    <div role="presentation" className={className}>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map(({ url, text }) => (
          <Link key={url} underline="hover" color="inherit" href={url}>
            {text}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}

BasicBreadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
  className: PropTypes.string,
};
