import React from 'react';

import { ReactComponent as NotFoundPageLogo } from '../../assets/images/NotFoundPageLogo.svg';

import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <NotFoundPageLogo className={styles.svgIcon} />
      <p className={styles.title}>oooops! we couldn&apos;t find this page</p>
      <p className={styles.helperText}>Sorry for inconvenience</p>
    </div>
  );
}
