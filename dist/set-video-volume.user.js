// ==UserScript==
// @name Set Video Volume
// @namespace tetratheta
// @version 1.0.0
// @description My ear hurts
// @author TetraTheta
// @grant none
// @match *://bbs.ruliweb.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/set-video-volume.user.js
// @downloadURL https://tetratheta.github.io/userscript/set-video-volume.user.js
// ==/UserScript==

'use strict'

(function () {
  const videoVolume = 0.1

  function handleVideos() {
    document.getElementsByTagName('VIDEO').forEach((v) => (v.volume = videoVolume))
    const observer = new MutationObserver((muts) => {
      muts.forEach((mut) => {
        mut.addedNodes.forEach((node) => {
          if (node.tagName === 'VIDEO') {
            node.volume = videoVolume
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true })
    document.addEventListener('playing', (evt) => {
      if (evt.target.tagName === 'VIDEO') {
        evt.target.volume = videoVolume
      }
    }, true);
  }

  // Wait for DOM content to be loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleVideos)
  } else {
    handleVideos()
  }
})();
