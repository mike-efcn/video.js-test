import videojs from 'video.js/dist/video.es';

const floatCompare = (a, b, fraction = 4) => {
  const floatToInt = (num) => Math.floor(num.toFixed(fraction) * Math.pow(10, fraction));
  return floatToInt(a) === floatToInt(b);
};

const createVideoPlayer = (el, options) => {
  const player_ = videojs(el, {
    preload: true,
    controls: false,
    children: [],
  });
  if (!window.players) {
    window.players = [];
  }
  window.players.push(player_);
  let playPromise_ = null;
  const {
    width: width_,
    height: height_,
    startTime: startTime_,
  } = options;

  const init = async () => {
    if (!player_) {
      throw Error('no _player');
    }

    player_.width(width_);
    player_.height(height_);
    // player_.playbackRate(16);
  };

  const play = async () => {
    playPromise_ = player_.play();
  };

  const pause = async () => {
    if (playPromise_) {
      await playPromise_.then(() => player_.pause());
      playPromise_ = null;
    }
  };

  const bufferSegment_ = async (player, pos) => new Promise((resolve) => {
    let timeout = null;
    const progress_ = () => {
      console.debug('progress', new Date().toISOString(), player.bufferedEnd());
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        player.off('progress', progress_);
        resolve(player.bufferedEnd());
      }, 1000);
    };
    player.on('progress', progress_);
    player.currentTime(pos);
  });

  const bufferRemaining_ = async (player, lastPos, end) => new Promise(async (resolve, _reject) => {
    const bufferedEnd = await bufferSegment_(player, lastPos);
    if (bufferedEnd >= end) {
      return resolve();
    }

    return resolve(bufferRemaining_(player, bufferedEnd, end));
  });

  const load = async (url) => {
    await new Promise((resolve) => {
      player_.one('loadedmetadata', resolve);
      player_.src({ src: url, type: 'application/x-mpegURL' });
    });
    console.debug('bufferStart', new Date().toISOString(), player_.bufferedEnd());
    await bufferRemaining_(player_, player_.bufferedEnd(), player_.duration());
    console.debug('bufferEnd', new Date().toISOString(), player_.bufferedEnd());
    player_.currentTime(0);
  };



  const jump = async (timestamp) => {
    console.error(startTime_, timestamp);
  };

  const destroy = async () => {
    pause();
    if (player_) {
      player_.dispose();
      player_ = null;
    }
  };

  return {
    init,
    load,
    play,
    pause,
    jump,
    destroy,
  };
};

export default createVideoPlayer;
