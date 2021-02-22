import React, { useEffect, useRef, useState } from 'react';
import createVideoPlayer from './createVideoPlayer';
import styles from './VideoItem.module.less';

const VideoItem = (props) => {
  const { videoOrder, playing, updateVideoStatus } = props;
  const { videoServerWidth, videoServerHeight, startTime } = videoOrder;
  let playerRef = useRef(null);
  let elRef = useRef(null);

  useEffect(() => {
    console.info('mount');
    const player = createVideoPlayer(elRef.current, {
      width: videoServerWidth,
      height: videoServerHeight,
      startTime,
    });
    playerRef.current = player;
    player.init();
  }, []);

  useEffect(() => () => {
    console.info('unmount');
    if (playerRef.current) {
      playerRef.current.destroy();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!videoOrder.videoUrl) {
        return;
      }

      await playerRef.current.load(videoOrder.videoUrl);
      updateVideoStatus(videoOrder.attendanceRefCode, 'ready');
    })();
  }, [videoOrder.videoUrl, videoOrder.attendanceRefCode, updateVideoStatus]);

  useEffect(() => {
    setTimeout(async () => {
      if (playing) {
        await playerRef.current.play();
      } else {
        await playerRef.current.pause();
      }
    }, 0);
  }, [playing]);

  return (
    <div className={styles.VideoItem}>
      <div
        style={{ width: videoServerWidth, height: videoServerHeight }}
        data-vjs-player
      >
        <video ref={elRef} width={videoServerWidth} height= {videoServerHeight} />
      </div>
    </div>
  );
};

export default VideoItem;
