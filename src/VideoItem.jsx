import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import styles from './VideoItem.module.less';

const poll = async (cb, interval = 50, times = 100) =>
  new Promise((resolve, reject) => {
    let count = times;
    const _poll = () => {
      const value = cb();
      if (value) {
        return resolve(value);
      }

      if (count < 0) {
        return reject(Error(`Cannot poll within ${times} * ${interval}ms`));
      }
      count -= 1;
      setTimeout(_poll, interval);
    };
    _poll();
  });


const VideoItem = (props) => {
  const { videoOrder, playing, updateVideoStatus } = props;
  const { videoServerWidth, videoServerHeight } = videoOrder;
  const elRef = useRef(null);
  const hlsRef = useRef(null);
  const dlRef = useRef(false);

  useEffect(() => {
    if (!Hls.isSupported()) {
      console.error('Not supported');
      return
    }

    if (!hlsRef.current) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.attachMedia(elRef.current);
    }
  }, []);

  useEffect(() => {
    (async () => {
      console.warn(videoOrder.videoUrl);
      hlsRef.current.loadSource(videoOrder.videoUrl);
      // await poll(() => downloaded);
      updateVideoStatus(videoOrder.attendanceRefCode, 'downloaded');
    })();
  }, [videoOrder.videoUrl, videoOrder.attendanceRefCode, updateVideoStatus]);

  useEffect(() => {
    if (!elRef.current) {
      return;
    }

    if (playing) {
      elRef.current.play();
    }
    else {
      elRef.current.pause();
    }
  }, [playing]);

  return (
    <div className={styles.VideoItem}>
      <video
        ref={elRef}
        width={videoServerWidth}
        height={videoServerHeight}
      />
    </div>
  );
};

export default VideoItem;
