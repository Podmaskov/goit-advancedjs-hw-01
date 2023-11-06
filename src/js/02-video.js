import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const THROTTLE_TIME = 1000;

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const throttledLocalStorage = throttle(
  seconds => {
    localStorage.setItem('videoplayer-current-time', seconds);
  },
  THROTTLE_TIME,
  { leading: false }
);

player.on('timeupdate', ({ seconds }) => {
  throttledLocalStorage(seconds);
});

const currentVideoTime = localStorage.getItem('videoplayer-current-time') || 0;
player.setCurrentTime(currentVideoTime);
