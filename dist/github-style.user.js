// ==UserScript==
// @name GitHub Style
// @namespace tetratheta
// @version 1.0.2
// @description Customized GitHub
// @author TetraTheta
// @grant none
// @match *://*.github.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/github-style.user.js
// @downloadURL https://tetratheta.github.io/userscript/github-style.user.js
// ==/UserScript==

function GM_addStyle(aCss) {
  'use strict';

  let head = document.getElementsByTagName('head')[0];
  if (head) {
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = aCss;
    head.appendChild(style);
    return style;
  }
  return null;
}

(() => {
  'use strict';

  const regular_font = "'Pretendard', 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Nanum Gothic', Arial, sans-serif !important;";
  const monospace_font =
    "'goorm Sans Code', 'D2Coding', 'Cascadia Code PL', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace !important;";

  const css_general = `
    :root {
      --fontStack-monospace: ${monospace_font};
      --fontStack-sansSerif: ${regular_font};
      --fontStack-sansSerifDisplay: ${regular_font};
      --fontStack-system: ${regular_font};

      font-family: ${regular_font};
    }
    .Fragment, .blob-code, .blob-code-content, .blob-code-inner, .markdown-body code, .markdown-body pre, .react-code-text, .text-mono, code, kbd, pre, samp, span[role='presentation'], textarea {
      font-family: ${monospace_font};
    }
  `;

  GM_addStyle(css_general);

  const onReady = () => {
    document.body.style.cssText += regular_font;
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
  else onReady();
})();
