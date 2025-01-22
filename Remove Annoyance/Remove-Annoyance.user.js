// ==UserScript==
// @name Remove Annoyance
// @namespace tetratheta
// @version 1.4.1
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
    addStyle('.article-content.spoiler-filter.active { filter: none !important; }')
    addStyle('.spoiler-alert-content { display: none !important; }')
    addStyle('.body .board-article .article-comment .list-area .comment-item .content .message .text pre.blur { filter: none !important; }')
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
  } else if (mhn('novelpia.com')) {
    addStyle('a[href="/comic_main"], a[href="/contest_list"], a[href="/plus"], a[href="/top100"], a[href="/plus"] { display: none }')
    addStyle('.main-slide-pc-banner { display: none }')
    addStyle('img[src="//images.novelpia.com/img/new/menu/switch_korean_on.svg"] { content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCA0MCAyMiI+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSIyMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODQgMTMpIiBmaWxsPSJyZ2JhKDI1NSwwLDAsMC4yMSkiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoLTIiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSI5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTc2IC00MCkiIGZpbGw9InJnYmEoMjU1LDAsMCwwLjI4KSIvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04NCAtMTMpIiBjbGlwLXBhdGg9InVybCgjY2xpcC1wYXRoKSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjIyIiByeD0iMTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg0IDEzKSIgZmlsbD0iI2RiZGVlMyIvPjxjaXJjbGUgY3g9IjYiIGN5PSI2IiByPSI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDkgMTgpIiBmaWxsPSIjZmZmIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwODggNjApIiBjbGlwLXBhdGg9InVybCgjY2xpcC1wYXRoLTIpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTc3IC00MCkiPjxwYXRoIGQ9Ik0tNDU2LjQsMzcuMDU3aDEuMzUyYTYuOTU5LDYuOTU5LDAsMCwxLS4xOTMsMS42NTYsNy4xLDcuMSwwLDAsMCwyLjUwOSwyLjA1MmwtLjc1MSwxLjAyNmE4LjAxMyw4LjAxMywwLDAsMS0yLjI0NS0xLjcyNyw1LjIyNCw1LjIyNCwwLDAsMS0xLjYzNiwxLjk1bC0xLjA0Ni0uODIyQTQuNzgyLDQuNzgyLDAsMCwwLTQ1Ni40LDM3LjA1N1ptLjkxNSw1LjI1MmgzLjAwN2MxLjQsMCwyLjI4NS43NDEsMi4yODUsMS44MDgsMCwxLjE2OC0uODgzLDEuODA4LTIuMjg1LDEuODA4aC0zLjAwN2MtMS40MTIsMC0yLjMtLjY0LTIuMy0xLjgwOEMtNDU3Ljc4LDQzLjA1MS00NTYuOSw0Mi4zMDktNDU1LjQ4Myw0Mi4zMDlabTMuMDA3LDEuMTM4aC0zLjAwN2MtLjU1OSwwLS45MTUuMjc0LS45MTUuNjcxcy4zNTYuNjcuOTE1LjY3aDMuMDA3Yy41MzgsMCwuOS0uMjY0LjktLjY3Uy00NTEuOTM5LDQzLjQ0Ny00NTIuNDc2LDQzLjQ0N1ptLjgtNS4wOHYtMS4zMWgxLjM0MXY0Ljk2OGgtMS4zNDFWMzkuNTY3aC0yLjAxMnYtMS4yWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDU4LjQwOSAtMzcuMDU3KSIgZmlsbD0iIzhiOGI4YiIvPjxwYXRoIGQ9Ik0tNDQ3LjMxLDM5Ljh2LS4zNzVhMi4zNDMsMi4zNDMsMCwwLDEsMi40NzktMi4zNjcsMi4zNDIsMi4zNDIsMCwwLDEsMi40NzgsMi4zNjdWMzkuOGEyLjM0NywyLjM0NywwLDAsMS0yLjQ3OCwyLjM2N0EyLjM0OCwyLjM0OCwwLDAsMS00NDcuMzEsMzkuOFptNy45NjUsNC43NTR2MS4yM2gtNy40NDZWNDIuOWgxLjM1MXYxLjY1NlptLTYuNjMzLTUuMTNWMzkuOGExLjE0MiwxLjE0MiwwLDAsMCwxLjE0OCwxLjIyOSwxLjE0OCwxLjE0OCwwLDAsMCwxLjE0OC0xLjIyOXYtLjM3NWExLjE0MywxLjE0MywwLDAsMC0xLjE0OC0xLjIyOUExLjEzNywxLjEzNywwLDAsMC00NDUuOTc4LDM5LjQyNFptNi40OTEtMi4zNjd2Ni41aC0xLjM0MXYtNi41WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDU1Ljg2NCAtMzcuMDU3KSIgZmlsbD0iIzhiOGI4YiIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="); }')
  }
})();
