// ==UserScript==
// @name Old Reddit Redirect
// @namespace tetratheta
// @version 1.1.0
// @description Conditional old reddit redirector
// @author TetraTheta
// @match https://*.reddit.com/*
// @icon https://reddit.com/favicon.ico
// @grant none
// @run-at document-start
// @updateURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Old%20Reddit%20Redirect/Old-Reddit-Redirect.user.js
// @downloadURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Old%20Reddit%20Redirect/Old-Reddit-Redirect.user.js
// ==/UserScript==

(function () {
  'use strict'
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
