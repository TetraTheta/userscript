// ==UserScript==
// @name Remove Annoyance
// @namespace tetratheta
// @version 1.3.0
// @description Things I can't do with AdGuard filter
// @author TetraTheta
// @match *://*/*
// @grant GM_addStyle
// @run-at document-start
// @updateURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Remove%20Annoyance/Remove-Annoyance.user.js
// @downloadURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Remove%20Annoyance/Remove-Annoyance.user.js
// ==/UserScript==
(function () {
  'use strict'

  const hn = window.location.hostname

  function mhn(pattern) {
    const regexPattern = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')
    if (pattern.startsWith('*.')) {
      const baseDomain = pattern.replace(/^\*\./, '');
      return new RegExp('^' + regexPattern + '$', 'i').test(hn) || hn === baseDomain
    }
    return new RegExp('^' + regexPattern + '$', 'i').test(hn)
  }

  // Fail-safe for 'GM_addStyle' not present
  const addStyle = typeof GM_addStyle !== 'undefined' ? GM_addStyle : (css) => {
    const styleEl = document.createElement('style')
    styleEl.textContent = css
    document.body.appendChild(styleEl)
  }

  if (mhn('hbstack.dev')) {
    // hbstack.dev - Anti-Adblock
    localStorage.setItem("hb-anti-adblock-reminded-at", Date.now().toString())
    const e = document.querySelector(".hb-anti-adblock")
    if (e) {
      e.style.display = 'none'
      e.hide()
    }
  } else if (mhn('arca.live')) {
    // arca.live - Spoiler alert
    GM_addStyle('.article-content.spoiler-filter.active { filter: none !important; }')
    GM_addStyle('.spoiler-alert-content { display: none !important; }')
    GM_addStyle('.body .board-article .article-comment .list-area .comment-item .content .message .text pre.blur { filter: none !important; }')
  } else if (mhn('youtube.com') || mhn('*.kbs.co.kr') || mhn('*.jtbc.co.kr') || mhn('*.joins.com')) {
    // Deny notification request
    Notification.requestPermission = function () {
      return Promise.resolve('denied')
    }
    if (navigator.permissions) {
      navigator.permissions.query = (params) => {
        if (params.name === 'notifications') {
          return Promise.resolve({ state: 'denied' })
        }
        return navigator.permissions.query(params)
      }
    }
  } else if (mhn('bbs.ruliweb.com')) {
    const videoVolume = 0.1
    const handleVideos = function() {
      // Immediately set volume for existing videos
      const videos = document.getElementsByTagName('video')
      for (let i = 0; i < videos.length; i++) {
        videos[i].volume = videoVolume
      }
      // Use MutationObserver to detect any new video elements added to the page
      const observer = new MutationObserver(function (muts) {
        muts.forEach(function (mut) {
          mut.addedNodes.forEach(function (node) {
            if (node.tagName === 'VIDEO') {
              node.volume = videoVolume
            }
          })
        })
      })
      observer.observe(document.body, { childList: true, subtree: true })
      // Listen to 'playing' event
      document.addEventListener('playing', function (evt) {
        if (evt.target.tagName === 'VIDEO') {
          evt.target.volume = videoVolume
        }
      }, true)
    }
    // Wait for DOM content to be loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleVideos)
    } else {
      handleVideos()
    }
  }
})();
