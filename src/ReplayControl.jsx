import React, { useCallback, useRef, useState } from 'react';
import styles from './ReplayControl.module.less';

const ReplayControl = (props) => {
  const { setPlaying, updateProgress } = props;
  const [pos, setPos] = useState(0);

  const togglePlaying = useCallback(() => setPlaying((prev) => !prev), []);
  const seek = useCallback((e) => {
    const rect = e.target.getBoundingClientRect();
    const newPos = ((e.clientX - rect.x) / rect.width).toFixed(4); // 0.xxxx
    setPos(newPos);
    updateProgress(newPos);
  }, [setPos, updateProgress]);

  return (
    <div className={styles.ReplayControl}>
      <div className={styles.container}>
        <div className={styles.play} onClick={togglePlaying} />
      </div>
      <div className={styles.progressBar} onClick={seek}>
        <span style={{ width: `${pos * 100}%` }}/>
      </div>
    </div>
  );
};

export default ReplayControl;
