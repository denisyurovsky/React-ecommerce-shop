import Breadcrumbs from '@mui/material/Breadcrumbs';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

export default function BasicBreadcrumbs({ links }) {
  return (
    <div role="presentation" className={styles.breadcrumbs}>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map(({ url, text }) => (
          <Link key={url} className={styles.breadcrumb} to={url}>
            {text}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}

BasicBreadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
};
