// ==UserScript==
// @name hbstack.dev Anti-AdBlock
// @namespace tetratheta
// @version 1.0.0
// @description I know what I'm doing
// @author TetraTheta
// @grant none
// @match *://hbstack.dev/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/hbstack-anti-adblock.user.js
// @downloadURL https://tetratheta.github.io/userscript/hbstack-anti-adblock.user.js
// ==/UserScript==

'use strict'

(function () {
  localStorage.setItem('hb-anti-adblock-reminded-at', Date.now().toString())
  const e = document.querySelector('.hb-anti-adblock')
  if (e) {
    e.style.display = 'none'
    e.hide()
  }
})();
