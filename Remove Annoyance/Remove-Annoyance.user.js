// ==UserScript==
// @name Remove Annoyance
// @namespace tetratheta
// @version 1.1.0
// @description Things I can't do with AdGuard filter
// @author TetraTheta
// @match https://*.hbstack.dev/*
// @match https://arca.live/*
// @grant GM_addStyle
// @run-at document-start
// @updateURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Remove%20Annoyance/Remove-Annoyance.user.js
// @downloadURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Remove%20Annoyance/Remove-Annoyance.user.js
// ==/UserScript==
(function () {
  'use strict'
  const hn = window.location.hostname
  if (hn === 'hbstack.dev') {
    localStorage.setItem("hb-anti-adblock-reminded-at", Date.now().toString());
    const e = document.querySelector(".hb-anti-adblock");
    e.hide();
  } else if (hn === 'arca.live') {
    GM_addStyle('.article-content.spoiler-filter.active { filter: none !important; }')
    GM_addStyle('.spoiler-alert-content { display: none !important; }')
    GM_addStyle('.body .board-article .article-comment .list-area .comment-item .content .message .text pre.blur { filter: none !important; }')
  }
})();
