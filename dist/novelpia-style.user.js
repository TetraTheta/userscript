// ==UserScript==
// @name Novelpia Style
// @namespace tetratheta
// @version 1.0.0
// @description There are too many useless thing
// @author TetraTheta
// @grant none
// @match *://*.novelpia.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/novelpia-style.user.js
// @downloadURL https://tetratheta.github.io/userscript/novelpia-style.user.js
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
  const style = `body, body.collapse-menu.dark-mode, div#app { font-family: 'Apple SD Gothic Neo', 'AppleSDGothicNeo', 'AppleSDGothicNeoR00', 'Pretendard', 'Noto Sans KR', 'Nanum Gothic', Arial, sans-serif !important; }
  a[href$='/comic_main'], a[href$='/contest_list'], a[href$='/event/plus_free'], a[href$='/plus'], a[href$='/plus'], a[href$='/top100'] { display: none; }
  #slide-banner-box, #slide-banner-box-mobile, .mybook-sub-nav.s_inv, .s-logo, a.header-gift .red-dot { display: none; }
  div.semi-blur { background-color: #e8e3f9; color: #000; }
  `

  GM_addStyle(style)

  // Apply custom style to element
  function jsStyle() {
    document
      .querySelectorAll('.novelbox table tbody tr td div')
      .forEach((div) => {
        if (div.textContent.trim() === '예약회차 있음') {
          div.classList.add('semi-blur');
          div.style.backgroundColor = '#e8e3f9';
          div.style.color = '#000';
        }
      });
  }
  jsStyle();

  document.addEventListener('DOMContentLoaded', jsStyle);
  const observer = new MutationObserver(() => jsStyle());
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // Force remove elements that aren't removed by CSS
  document.body.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      document.body
        .querySelectorAll('#slide-banner-box')
        .forEach((e) => e.remove());
    }, 100);
  });

  // Hide Ads
  const plus_free = '/event/plus_free';
  document.body.addEventListener(
    'click',
    (evt) => {
      const elem = evt.target;
      if (elem.href && elem.href.endsWith(plus_free)) {
        evt.preventDefault();
        elem.style.display = 'none';
      }
      if (elem.onclick && elem.onclick.toString().endsWith(plus_free)) {
        evt.preventDefault();
        elem.style.display = 'none';
      }
      if (window.location.pathname.endsWith(plus_free)) {
        evt.preventDefault();
      }
    },
    true
  );

  // Use Page navigation
  document.addEventListener('DOMContentLoaded', () =>
    window.localStorage.setItem('viewer_paging', 1)
  );
  window.localStorage.setItem('viewer_paging', 1);

  // Apply font via HTML modification
  document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementsByTagName('body')[0]
      .setAttribute(
        'style',
        "'Apple SD Gothic Neo', 'Pretendard', 'Noto Sans KR', 'Nanum Gothic', Arial, sans-serif !important;"
      );
  });
})();
