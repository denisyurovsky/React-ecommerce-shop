import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Page Not Found</p>
      <p>The page you are looking for could not be found.</p>
      <Link to={'/'}>Go to home page</Link>
    </div>
  );
}
