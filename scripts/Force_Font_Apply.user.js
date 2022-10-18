// ==UserScript==
// @name         Force Apply Fonts
// @namespace    https://github.com/TetraTheta
// @version      0.1.1.221007
// @description  Apply fonts for websites
// @author       TetraTheta
// @updateURL    https://github.com/TetraTheta/TetraUserJS/raw/master/scripts/Force_Font_Apply.user.js
// @downloadURL  https://github.com/TetraTheta/TetraUserJS/raw/master/scripts/Force_Font_Apply.user.js
// @match        *://*/*
// @exclude      *://*.pixiv.net/*
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
  const css = `
    html, body {
      font-family: 'Spoqa Han Sans Neo', 'Min Sans', 'Noto Sans KR', 'Noto Sans CJK KR', sans-serif !important;
    }
    pre, code {
      font-family: 'Monoplex KR Wide Nerd', 'Cascadia Mono', 'D2 Coding', 'D2Coding', monospace !important;
    }
    .board_main .board_list_table .subject {
      /* List */
      font-size: 14px !important;
    }
    .comment_wrapper .comment_view .comment_element .comment .text_wrapper .text {
      /* Comment */
      font-size: 14px !important;
    }
    .top_best.best_list .list_wrapper .item {
      /* Top Articles */
      font-size: 14px !important;
    }
  `;
  GM_addStyle(css);
}
