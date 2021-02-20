import React from 'react';
import styles from './VideoItem.module.less';

const VideoItem = (props) => {
  if (!props.videoOrder) {
    return (
      <div className={styles.VideoItem}>
        <video width={480} height={240} />
      </div>
    );
  }

  const { videoServerWidth, videoServerHeight } = props.videoOrder;

  return (
    <div className={styles.VideoItem}>
      <video width={videoServerWidth} height={videoServerHeight} />
    </div>
  );
};

export default VideoItem;
