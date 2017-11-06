// ==UserScript==
// @name        yt-url-at-time
// @namespace   mechalynx/yt-url-at-time
// @grant       none
// @description On youtube, use alt+` to set the url to the current timestamp, for easy bookmarking
// @include     https://www.youtube.tld/*
// @version     0.1.2
// @copyright   2017, MechaLynx (https://github.com/MechaLynx)
// @updateURL   https://openuserjs.org/meta/MechaLynx/yt-url-at-time.meta.js
// @run-at document-idle
// ==/UserScript==
// jshint esversion: 6

var re_timehash = /#t=([0-9]*(h|m|s))*/g;

var video = {
  get element() {
    return document.querySelector('#movie_player video');
  },
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
};

var wait_for_page = window.setInterval(function(){
  var current_time_element = document.querySelector('.ytp-time-current');
  if (current_time_element){
    window.clearInterval(wait_for_page);

    let time_style = document.createElement('style');
    time_style.innerHTML = `
      .url-at-time-element-hover:hover{
        cursor: pointer;
      }
	`;
    document.body.appendChild(time_style);

    console.log(current_time_element);
    current_time_element.onmouseover = function(){
      if (document.querySelector('.videoAdUi')){
        current_time_element.classList.remove('url-at-time-element-hover');
      }else{
        current_time_element.classList.add('url-at-time-element-hover');
      }
    };

    current_time_element.addEventListener('click', hashmodifier);
  }
}, 1000);

var hashmodifier = function(){
  if ( location.href.match(/.*watch.*/) && document.querySelector('.videoAdUi') === null){
    history.replaceState(false, false, video.notimehash + video.timehash);
  }
};

document.addEventListener('keydown', z => {
  // if you want to change the hotkey
  // you can use this: http://mechalynx.github.io/keypress/
  // or another tester if you don't like this one
    z.altKey && 'Backquote' === z.code && hashmodifier();
});
