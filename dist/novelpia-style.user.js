// ==UserScript==
// @name Novelpia Style
// @namespace tetratheta
// @version 1.0.1
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

  // Force remove elements because style alone doesn't work
  document.addEventListener('DOMContentLoaded', function() {
    const removals = [
      '#slide-banner-box',
      '#slide-banner-box-mobile',
      '.mybook-sub-nav.s_inv',
      '.s-logo',
      'a.header-gift .red-dot',
      'a[href$="/comic_main"]',
      'a[href$="/contest_list"]',
      'a[href$="/event/plus_free"]',
      'a[href$="/plus"]',
      'a[href$="/plus"]',
      'a[href$="/top100"]',
    ]

    removals.forEach(function (t) {
      console.log('Removing ' + t)
      let e = document.querySelectorAll(t)
      if (e.length > 0) {
        Array.from(e).forEach(function (ele) {
          ele.parentNode.removeChild(ele)
        })
      } else {
        console.warn('No elements found for ' + t)
      }
    })
  })

  // Set style for Reservation Post
  function reservationStyle() {
    document.querySelectorAll('.novelbox table tbody tr td div').forEach((d) => {
      if (d.textContent.trim() === '예약회차 있음') {
        d.classList.add('semi-blur');
        d.style.backgroundColor = '#e8e3f9';
        d.style.color = '#000';
      }
    })
  }
  reservationStyle();

  document.addEventListener('DOMContentLoaded', reservationStyle);
  const observer = new MutationObserver(() => reservationStyle());
  observer.observe(document.documentElement, { childList: true, subtree: true });

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
  document.addEventListener('DOMContentLoaded', () => window.localStorage.setItem('viewer_paging', 1));
  window.localStorage.setItem('viewer_paging', 1);

  // Apply font via HTML modification
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByTagName('body')[0].setAttribute('style', "font-family: 'Apple SD Gothic Neo', 'Pretendard', 'Noto Sans KR', 'Nanum Gothic', Arial, sans-serif !important;");
  });
})();
