// ==UserScript==
// @name        yt-url-at-time
// @namespace   mechalynx/yt-url-at-time
// @grant       none
// @description On youtube, use alt+` to set the url to the current timestamp, for easy bookmarking
// @include     https://www.youtube.tld/watch*
// @version     0.0.1
// @copyright   2017, MechaLynx (https://github.com/MechaLynx)
// @updateURL   https://openuserjs.org/meta/MechaLynx/yt-url-at-time.meta.js
// ==/UserScript==

var re_timehash = /#t=([0-9]*(h|m|s))*/g;
var video = {
  element: document.getElementsByTagName('video') [0],
  get timehash() {
    var secs = this.element.currentTime;
    return '#t=' + [(h = ~~(secs / 3600)) && h + 'h' || null,
    (m = ~~(secs % 3600 / 60)) && m + 'm' || null,
    (s = ~~(secs % 3600 % 60)) && s + 's'].join('');
  },
  get notimehash() {
    return window.location.origin +
    window.location.pathname +
    window.location.search +
    window.location.hash.replace(re_timehash, '');
  }
}
document.addEventListener('keydown', z => {
  // if you want to change the hotkey
  // you can use this: http://mechalynx.github.io/keypress/
  // or another tester if you don't like this one
  z.altKey && 'Backquote' === z.code && history.replaceState(false, false, video.notimehash + video.timehash)
});
