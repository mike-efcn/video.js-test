import React, { useMemo } from 'react';
import VideoItem from './VideoItem';
import styles from './ReplayVideoGroup.module.less';

console.error(process.env.videoOptions);
const videoOptions = process.env.videoOptions;

const ReplayVideoGroup = () => {
  const videos = useMemo(() => {
    const m3u8List = videoOptions.m3u8List || '';
    const mp4List = videoOptions.mp4List || '';
    return m3u8List.split(',').map((videoUrl, i) => ({
      key: `m3u8-${i}`,
      videoUrl,
      startTime: 1613721188000,
      videoServerWidth: 320,
      videoServerHeight: 240,
      attendanceRefCode: 'b7f239bf-b560-4c60-9f6b-866d74eed3a4'
    })).concat(mp4List.split(',').map((videoUrl, i) => ({
      key: `mp4-${i}`,
      videoUrl,
      startTime: 1613721188000,
      videoServerWidth: 320,
      videoServerHeight: 240,
      attendanceRefCode: 'b7f239bf-b560-4c60-9f6b-866d74eed3a4'
    }))).concat(null);
  }, []);

  return (
    <div className={styles.ReplayVideoGroup}>
      <ul>
        {videos.map((video) => (
          <li><VideoItem videoOrder={video} /></li>
        ))}
      </ul>
    </div>
  );
};

export default ReplayVideoGroup;
