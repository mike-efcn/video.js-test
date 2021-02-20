import React from 'react';
import ReplayVideoGroup from './ReplayVideoGroup';
import styles from './App.module.less';

const App = () => (
  <div className={styles.App}>
    <div className={styles.header}>
      <div className={styles.title}>EVC Classroom</div>
      <div className={styles.time}>{(() => new Date().toISOString().slice(14, 19))()}</div>
    </div>
    <div className={styles.videoGroup}>
      <ReplayVideoGroup />
    </div>
    <div className={styles.content}>
      <canvas />
    </div>
  </div>
);

export default App;
