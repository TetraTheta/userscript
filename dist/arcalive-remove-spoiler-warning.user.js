// ==UserScript==
// @name ArcaLive Remove Spoiler Warning
// @namespace tetratheta
// @version 1.0.0
// @description I know what I'm doing
// @author TetraTheta
// @icon https://arca.live/static/favicon.ico
// @grant none
// @match *://arca.live/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/arcalive-remove-spoiler-warning.user.js
// @downloadURL https://tetratheta.github.io/userscript/arcalive-remove-spoiler-warning.user.js
// ==/UserScript==

'use strict'

function GM_addStyle(aCss) {
  let head = document.getElementsByTagName('head')[0]
  if (head) {
    let style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.textContent = aCss
    head.appendChild(style)
    return style
  }
  return null
}

(function () {
  // Don't run on iframes
  if (window.top != window.self) return

  // Inject style first
  const style = `
  .article-content.spoiler-filter.active { filter: none !important; }
  .spoiler-alert-content { display: none !important; }
  .body .board-article .article-comment .list-area .comment-item .content .message .text pre.blur { filter: none !important; }
  `

  GM_addStyle(style)
})();
