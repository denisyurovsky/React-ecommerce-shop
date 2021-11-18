import React from 'react';

import smile from '../../assets/images/smile.svg';

import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.container}>
      <div>
        <p data-testid="title" className={styles.hello}>
          Hi team&nbsp;
          <img src={smile} className={styles.smileIcon} alt="smile" />
        </p>
        <p>
          Today we are starting our course. This is a component-example
          describing a general structure of any component in our project. Please
          look at it, loot at the project structure and the structure of the
          component App, look at the file naming in JS and CSS code and try to
          follow these conventions. Also have a look at the App.test.js, it
          shows the general structure of a test file and basic testing
          principles.
        </p>
        <p>Good luck! :)</p>
        <a
          className="appLink"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  );
}
