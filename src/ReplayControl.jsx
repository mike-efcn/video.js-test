import React, { useCallback } from 'react';
import styles from './ReplayControl.module.less';

const ReplayControl = (props) => {
  const { setPlaying } = props;

  const togglePlaying = useCallback(() => setPlaying((prev) => !prev), []);

  return (
    <div className={styles.ReplayControl}>
      <div className={styles.container}>
        <div className={styles.play} onClick={togglePlaying} />
      </div>
      <div className={styles.progressBar}>
        <span />
      </div>
    </div>
  );
};

export default ReplayControl;
