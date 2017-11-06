// ==UserScript==
// @name        yt-url-at-time
// @namespace   mechalynx/yt-url-at-time
// @grant       none
// @description On youtube, use alt+` to set the url to the current timestamp, for easy bookmarking
// @include     https://www.youtube.tld/*
// @version     0.2.4
// @copyright   2017, MechaLynx (https://github.com/MechaLynx)
// @updateURL   https://openuserjs.org/meta/MechaLynx/yt-url-at-time.meta.js
// @downloadURL https://openuserjs.org/src/scripts/MechaLynx/yt-url-at-time.user.js
// @run-at document-idle
// ==/UserScript==
// jshint esversion: 6

// Matches time hashes for the purpose of removing them
// note that I don't like my regexp here...
var re_timehash = /#t=(?:[0-9]*\.?[0-9]*|(?:[0-9]*(?:h|m|s))*)*/g;

// `video` element utility
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
  get plaintimehash() {
    return '#t=' + this.element.currentTime;
  },
  get notimehash() {
    return window.location.origin +
    window.location.pathname +
    window.location.search +
    window.location.hash.replace(re_timehash, '');
  }
};

// Keep looking for the time indicator span, until it's found
// The `load` event is insufficient
var wait_for_page = window.setInterval(function(){
  var current_time_element = document.querySelector('.ytp-time-current');
  if (current_time_element){
    window.clearInterval(wait_for_page);

    // Add CSS for time indicator span
    let time_style = document.createElement('style');
    time_style.setAttribute('name', "yt-url-at-time");
    time_style.innerHTML = `
      .url-at-time-element-hover:hover{
        cursor: pointer;
      }
      .url-at-time-clipboard-helper{
        position: absolute;
        top: 0;
        left: 0;
        padding: none;
        margin: none;
        border: none;
        width: 0;
        height: 0;
      }
	  `;
    document.body.appendChild(time_style);

    // Toggle the class so that it doesn't look clickable
    // during ads, which would be confusing
    current_time_element.onmouseover = function(){
      if (document.querySelector('.videoAdUi')){
        current_time_element.classList.remove('url-at-time-element-hover');
      }else{
        current_time_element.classList.add('url-at-time-element-hover');
      }
    };

    current_time_element.addEventListener('click', function(e){
      if (e.altKey){
        hashmodifier(true);
      } else {
        hashmodifier(false);
      }

      if (e.ctrlKey){
        copy_url_to_clipboard();
      }
    });
  }
}, 1000);

// Add the timestamp to the URL
var hashmodifier = function(precise=false){
  if ( location.href.match(/.*watch.*/) && document.querySelector('.videoAdUi') === null){
    precise ? history.replaceState(false, false, video.notimehash + video.plaintimehash) : history.replaceState(false, false, video.notimehash + video.timehash);
  }
};

var copy_url_to_clipboard = function(attempt_to_restore=false){
  // Current focus and selection cannot be restored
  // since clicking on the timer causes the movie player to be focused
  // clearing the selection and changing the active element before we arrive here
  // However, attempting to restore them is meaningful if called through a hotkey
  if (attempt_to_restore){
    let selection = document.getSelection();
    let current_selection = selection.getRangeAt(0);
    let current_focus = document.activeElement;
  }

  // Add invisible textarea to allow copying the generated URL to clipboard
  let clipboard_helper = document.createElement('textarea');
  clipboard_helper.classList.add('url-at-time-clipboard-helper');
  document.body.appendChild(clipboard_helper);

  clipboard_helper.value = window.location.href;
  clipboard_helper.select();
  clipboard_helper.setSelectionRange(0, clipboard_helper.value.length);
  document.execCommand('copy');

  document.body.removeChild(clipboard_helper);

  if (attempt_to_restore){
    current_focus.focus();

    // https://gist.github.com/dantaex/543e721be845c18d2f92652c0ebe06aa
    selection.empty();
    selection.addRange(current_selection);
  }
};

var _alt=false;
var _q=false;
// Listen for the hotkey
document.addEventListener('keydown', z => {
  // if you want to change the hotkey
  // you can use this: http://mechalynx.github.io/keypress/
  // or another tester if you don't like this one
  if (z.code === 'KeyQ'){
    _q=true;
  }
  if (z.altKey && z.code === 'Backquote'){
    hashmodifier(_alt);
    _alt=true;
  }
  if (_q){
    copy_url_to_clipboard();
  }
});

document.addEventListener('keyup', z => {
  if(z.key == "Alt"){
    _alt=false;
  }else if(z.code === "KeyQ"){
    _q=false;
  }
});
