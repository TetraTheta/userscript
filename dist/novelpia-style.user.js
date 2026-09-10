// ==UserScript==
// @name Novelpia Style
// @namespace tetratheta
// @version 1.3.1
// @description There are too many useless thing
// @author TetraTheta
// @grant none
// @match *://*.novelpia.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/novelpia-style.user.js
// @downloadURL https://tetratheta.github.io/userscript/novelpia-style.user.js
// ==/UserScript==

// ####################
// # Shared Utilities #
// ####################

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

function GM_removeElements(selectors) {
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length == 0) {
      console.log(`No elements found for ${selector}`);
      continue;
    }
    for (const el of elements) el.remove();
    console.log(`Remove ${selector}`);
  }
}

(() => {
  'use strict';

  // ##########
  // # Config #
  // ##########

  // Set this to 'true' if you are subscribing Plus plan
  const is_premium = true;

  // #######################
  // # Ad Link Click Guard #
  // #######################

  const plus_free_path = '/event/plus_free';

  const handleAdClick = (evt) => {
    const el = evt.target;
    if (!el.href && !el.onclick) return;
    const hrefMatch = el.href?.endsWith(plus_free_path);
    const onClickMatch = el.onclick?.toString().includes(plus_free_path);
    const pathMatch = window.location.pathname.endsWith(plus_free_path);

    if (hrefMatch || onClickMatch || pathMatch) {
      evt.preventDefault();
      el.style.display = 'none';
      console.log('Blocked ad link:', el);
    }
  };

  // ############################
  // # Element Hiding - General #
  // ############################

  const css_general = `
    #slide-banner-box, #slide-banner-box-mobile, .mybook-sub-nav.s_inv, .s-logo, a.header-gift .red-dot { display: none; }
    div.mybook-tab-container :nth-child(2), div.mybook-tab-container :nth-child(3) { display: none; }
    div.mybook-tab-container-m :nth-child(2), div.mybook-tab-container-m :nth-child(3) { display: none; }
  `;

  const removals_general = ['#slide-banner-box', '#slide-banner-box-mobile', '.mybook-sub-nav.s_inv', '.s-logo', 'a.header-gift .red-dot'];

  // #############################
  // # Element Hiding - Non-Plus #
  // #############################

  const css_no_plus = `
    a[href$='/comic_main'],
    a[href$='/contest_list'],
    a[href$='/event/plus_free'],
    a[href$='/plus'],
    a[href$='/top100'] { display: none; }
  `;

  const removals_no_plus = [
    'a[href$="/comic_main"]',
    'a[href$="/contest_list"]',
    'a[href$="/event/plus_free"]',
    'a[href$="/plus"]',
    'a[href$="/top100"]',
  ];

  // ########
  // # Font #
  // ########

  const font =
    "font-family: 'Apple SD Gothic Neo', 'Pretendard', 'Spoqa Han Sans Neo', 'Noto Sans KR', 'Nanum Gothic', Arial, sans-serif !important;";

  const css_font = `
    body, body.collapse-menu.dark-mode, div#app, div#novel_drawing_page { ${font} }
  `;

  // ########################
  // # Network Progress Bar #
  // ########################

  let activeRequests = 0;
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '0%',
    height: '3px',
    backgroundColor: '#007bff',
    zIndex: '99999',
    transition: 'width 0.3s ease, opacity 0.3s ease',
    pointerEvents: 'none',
  });
  document.documentElement.appendChild(bar);

  const originalFetch = window.fetch;
  const originalSend = XMLHttpRequest.prototype.send;

  const updateBar = () => {
    if (activeRequests <= 0) {
      activeRequests = 0;
      bar.style.width = '100%';
      setTimeout(() => {
        bar.style.opacity = '0';
        bar.style.width = '0%';
      }, 200);
    } else {
      bar.style.opacity = '1';
      let progress = Math.min(90, 10 + activeRequests * 15);
      bar.style.width = progress + '%';
    }
  };

  window.fetch = async function (...args) {
    activeRequests++;
    updateBar();
    try {
      return await originalFetch(...args);
    } finally {
      activeRequests--;
      updateBar();
    }
  };

  XMLHttpRequest.prototype.send = function (...args) {
    activeRequests++;
    updateBar();
    this.addEventListener(
      'loadend',
      () => {
        activeRequests--;
        updateBar();
      },
      { once: true },
    );
    return originalSend.apply(this, args);
  };

  // ########################
  // # Reservation Chapters #
  // ########################

  const css_reservation_chapters = `
    div.semi-blur { background-color: #e8e3f9; color: #000; }
  `;

  const applyReservationStyle = () => {
    document.querySelectorAll('.novelbox table tbody tr td div').forEach((div) => {
      if (div.textContent.trim() === '예약회차 있음') {
        div.classList.add('semi-blur');
        div.style.backgroundColor = '#e8e3f9';
        div.style.color = '#000';
      }
    });
  };

  const observer = new MutationObserver(applyReservationStyle);

  // ###################
  // # Viewer Settings #
  // ###################

  const applyViewerSettings = () => {
    localStorage.setItem('viewer_paging', 1);
  };

  // ############
  // # Start Up #
  // ############

  GM_addStyle(css_font);
  GM_addStyle(css_general);
  GM_addStyle(css_reservation_chapters);
  if (!is_premium) GM_addStyle(css_no_plus);

  const onReady = () => {
    GM_removeElements(removals_general);
    if (!is_premium) GM_removeElements(removals_no_plus);
    applyReservationStyle();
    applyViewerSettings();
    document.body.addEventListener('click', handleAdClick, true);
    document.body.style.cssText += font;
  };

  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
  else onReady();
})();
