// ==UserScript==
// @name Old Reddit Redirect
// @namespace tetratheta
// @version 1.1.0
// @description Conditional old reddit redirector
// @author TetraTheta
// @icon https://reddit.com/favicon.ico
// @grant none
// @match *://*.reddit.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/old-reddit-redirect.user.js
// @downloadURL https://tetratheta.github.io/userscript/old-reddit-redirect.user.js
// ==/UserScript==

'use strict'

(function () {
  function hasNewQueryString(url) { return url.includes('new=true') || url.includes('old=false') }
  function redirectToOldReddit() {
    if (window.location.hostname !== 'old.reddit.com' && !hasNewQueryString(window.location.href)) {
      window.location.replace('https://old.reddit.com' + window.location.pathname + window.location.search + window.location.hash)
    }
  }
  function redirectToNewReddit() {
    if (window.location.hostname === 'old.reddit.com' && hasNewQueryString(window.location.href)) {
      window.location.replace('https://www.reddit.com' + window.location.pathname + window.location.search + window.location.hash);
    }
  }
  if (window.location.hostname.includes('reddit.com')) {
    if (window.location.hostname === 'www.reddit.com' && !window.location.hostname.includes('old.reddit.com')) {
      redirectToOldReddit();
    } else if (window.location.hostname === 'old.reddit.com') {
      redirectToNewReddit();
    }
  }
})();
