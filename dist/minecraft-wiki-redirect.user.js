// ==UserScript==
// @name Minecraft Wiki Redirect
// @namespace tetratheta
// @version 1.0.0
// @description Redirect from minecraft.fandom.com to minecraft.wiki
// @author TetraTheta
// @icon https://files.catbox.moe/y8i3zz.ico
// @grant none
// @match *://minecraft.fandom.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/minecraft-wiki-redirect.user.js
// @downloadURL https://tetratheta.github.io/userscript/minecraft-wiki-redirect.user.js
// ==/UserScript==

'use strict'

(function () {
  location.replace(location.href.replace("fandom.com", "wiki"));
})();
