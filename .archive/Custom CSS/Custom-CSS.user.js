// ==UserScript==
// @name         Custom CSS
// @namespace    https://github.com/TetraTheta
// @version      0.2.1.221229
// @description  Apply custom CSS for various sites
// @author       TetraTheta
// @updateURL    https://github.com/TetraTheta/TetraUserScripts/raw/main/.archive/Custom%20CSS/Custom-CSS.user.js
// @downloadURL  https://github.com/TetraTheta/TetraUserScripts/raw/main/.archive/Custom%20CSS/Custom-CSS.user.js
// @match        *://*.ruliweb.com/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

// Get host
const host = location.hostname.split('.').slice(-2).join('.');

switch (host) {
  case 'ruliweb.com':
    ruliweb();
}

function ruliweb() {
  // Customize Ruliweb layout
  const css = `
    /* Font */
    html, body { font-family: 'Spoqa Han Sans Neo', 'Min Sans', 'Noto Sans KR', 'Noto Sans CJK KR', sans-serif !important; }
    pre, code { font-family: 'Monoplex KR Wide Nerd', 'Cascadia Mono', 'D2 Coding', 'D2Coding', monospace !important; }
    /* Article List */
    .board_main .board_list_table .subject { font-size: 14px !important; }
    /* Comment */
    .comment_wrapper .comment_view .comment_element .comment .text_wrapper .text { font-size: 14px !important; }
    /* Top Articles */
    .top_best.best_list .list_wrapper .item { font-size: 14px !important; }
  `;
  GM_addStyle(css);

  // Remove elements
  var family = document.getElementsByClassName('family');
  var sideWrapper = document.getElementsByClassName('side_wrapper');
  removeForEach(family);
  removeForEach(sideWrapper);
}


/* Useful Methods */
function removeForEach(node) {
  for (let i=0; i < node.length; i++) {
    node.item(i).remove();
  }
}
