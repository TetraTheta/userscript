// ==UserScript==
// @name Minecraft Wiki Redirector
// @namespace tetratheta
// @version 1.0.0
// @description Redirect from minecraft.fandom.com to minecraft.wiki
// @author TetraTheta
// @match *://minecraft.fandom.com/*
// @icon https://files.catbox.moe/y8i3zz.ico
// @grant none
// @run-at document-start
// @updateURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Minecraft%20Wiki%20Redirector/Minecraft-Wiki-Redirector.user.js
// @downloadURL https://github.com/TetraTheta/TetraUserScripts/raw/main/Minecraft%20Wiki%20Redirector/Minecraft-Wiki-Redirector.user.js
// ==/UserScript==

(function () {
  location.replace(location.href.replace("fandom.com", "wiki"));
})();
