// ==UserScript==
// @name Custom Adblocker
// @namespace tetratheta
// @version 1.0.0
// @description Things I can't do with AdGuard filter
// @author TetraTheta
// @match https://*.hbstack.dev/*
// @grant GM_addStyle
// @run-at document-start
// @updateURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Custom%20Adblocker/Custom-Adblocker.user.js
// @downloadURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Custom%20Adblocker/Custom-Adblocker.user.js
// ==/UserScript==
(function () {
  'use strict'
  if (window.location.hostname == 'hbstack.dev') {
    localStorage.setItem("hb-anti-adblock-reminded-at", Date.now().toString());
    const e = document.querySelector(".hb-anti-adblock");
    e.hide();
  }
})();
