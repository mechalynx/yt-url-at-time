// ==UserScript==
// @name        yt-url-at-time
// @namespace   mechalynx/yt-url-at-time
// @grant       none
// @description Adds a hotkey that sets your current url to the current time on the video being watched
// @include     https://www.youtube.tld/watch*
// @version     0.0.1
// @copyright   2017, MechaLynx (https://github.com/MechaLynx)
// @updateURL   https://openuserjs.org/meta/MechaLynx/userscript.meta.js
// ==/UserScript==

document.addEventListener('keydown', (z) => {
    // if you want to change the hotkey
    // you can use this: http://mechalynx.github.io/keypress/
    // or another tester if you don't like this one
    if (z.altKey && z.code === "Backquote" ){
        window.location.assign(
            (window.location.href.match(/(.*)(?:#t)/) ? window.location.href.match(/(.*)(?:#t)/)[1] : window.location.href) +
              (() => {secs=yt.player.utils.VideoTagPool.instance.A[0].currentTime; 
                      return "#t=" + [ ( h = ~~(secs/3600) ) && h + "h" || null,
                                       ( m = ~~((secs%3600)/60) ) && m + "m" || null,
                                       ( s = ~~(((secs%3600)%60)) ) && s + "s" ].join("");
                     }
              )()
       );
    }
});
