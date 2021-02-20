import React, { useCallback, useEffect, useState } from 'react';
import ReplayControl from './ReplayControl';
import VideoItem from './VideoItem';
import styles from './ReplayVideoGroup.module.less';

const videos = (() => {
  console.error(process.env.videoOptions);
  const videoOptions = process.env.videoOptions;
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
  })));
})();

const ReplayVideoGroup = () => {
  const [videoOrders, setVideoOrders] = useState([]);
  const [videoStatus, setVideoStatus] = useState(null);
  const [playing, setPlaying] = useState(false);

  const updateVideoStatus = useCallback(
    (key, value) => setVideoStatus((prev) => ({ ...prev, [key]: value })),
    [setVideoStatus],
  );

  useEffect(() => {
    (async () => {
      const data = await new Promise((resolve) => {
        setTimeout(() => resolve(videos), 2500);
      });
      setVideoOrders(data);
      data.forEach(
        (video) => updateVideoStatus(video.attendanceRefCode, 'pending'),
      );
    })();
  }, [setVideoOrders, updateVideoStatus]);

  useEffect(() => {
    if (!videoStatus) {
      return;
    }

    const canPlay = Object.keys(videoStatus)
      .map((key) => videoStatus[key] === 'downloaded')
      .every(Boolean);
    if (canPlay) {
      setPlaying(false && true);
    }
  }, [videoStatus, setPlaying]);

  return (
    <div className={styles.ReplayVideoGroup}>
      <div className={styles.control}>
        <ReplayControl setPlaying={setPlaying} />
      </div>
      <div className={styles.container}>
        <ul>
          {videoOrders.concat(null).map((video) => (
            <li key={video?.key || '1'}>
              {video
                ? (
                <VideoItem
                  videoOrder={video}
                  playing={playing}
                  updateVideoStatus={updateVideoStatus}
                />
              ) : (
                <div><video width={480} height={240} /></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReplayVideoGroup;
