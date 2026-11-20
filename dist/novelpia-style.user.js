// ==UserScript==
// @name Novelpia Style
// @namespace tetratheta
// @version 1.6.1
// @description There are too many useless thing
// @author TetraTheta
// @grant none
// @match *://*.novelpia.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/novelpia-style.user.js
// @downloadURL https://tetratheta.github.io/userscript/novelpia-style.user.js
// ==/UserScript==

'use strict';

// ####################
// # Shared Utilities #
// ####################

function addStyle(css) {
  const style = document.createElement('style');
  style.textContent = css;
  (document.head ?? document.documentElement).appendChild(style);
  return style;
}

function removeElements(selector) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) {
    console.log(`No elements found for ${selector}`);
    return;
  }
  for (const el of elements) el.remove();
  console.log(`Removed ${elements.length} element(s) for ${selector}`);
}

function setCookie(key, value, expires = 30, path = '/', domain = 'novelpia.com', secure = false, sameSite = 'Lax') {
  const isDelete = value === null;
  let cookieStr = `${encodeURIComponent(key)}=${isDelete ? '' : encodeURIComponent(value)}`;
  // expires
  if (isDelete) {
    cookieStr += `; expires=${new Date(0).toUTCString()}`;
  } else if (typeof expires === 'number') {
    const expiresDate = new Date(Date.now() + expires * 86400000);
    cookieStr += `; expires=${expiresDate.toUTCString()}`;
  } else if (expires instanceof Date) {
    cookieStr += `; expires=${expires.toUTCString()}`;
  }
  // path
  if (path) cookieStr += `; path=${path}`;
  // domain
  if (domain) cookieStr += `; domain=${domain}`;
  // sameSite
  if (sameSite) cookieStr += `; SameSite=${sameSite}`;
  // secure
  if (secure) cookieStr += '; Secure';
  //
  document.cookie = cookieStr;
}

(() => {
  // ##########
  // # Config #
  // ##########

  // Remove annoyance
  const removeAnnoyances = true;
  const annoyanceSelectors = [
    '#slide-banner-box',
    '#slide-banner-box-mobile',
    '.mybook-sub-nav.s_inv',
    '.s-logo',
    'a.header-gift .red-dot',
  ];
  // Remove upsells (Comic, NovelChat, Plus)
  const removeUpsells = true;
  const upsellSelectors = [
    'a[href$="/comic_main"]',
    'a[href$="/event/plus_free"]',
    'a[href$="/plus"]',
    'a[href$="/plus_shop"]',
    'a[href^="https://chatple.novelpia.com/"]',
  ];
  // Set website style (Cookie)
  const setWebsiteStyle = true;
  const websiteStyle = {
    // do not sort this
    novelchanCursor: false, // CURSOR (1/)
    darkWebsite: true, // DARKMODE_S (1/)
    darkViewer: true, // DARKMODE (1/)
    pinTop100: true, // TOP100_ALL (1/)
    blockCoverThumbnail: false, // COVER_VIEW (OFF/ON)
    blockOpenTheDoor: false, // OPEN_THE_DOOR (OFF/ON)
    blockWriterReview: false, // BLOCK_WRITER_REVIEWS (ON/OFF)
    blockIllustration: false, // BLOCK_ILLUSTRATION (ON/OFF)
    includeParodyInRanking: true, // BLOCK_PARODY (ON/OFF) // WTF?
  };
  // Set viewer style (LocalStorage)
  const setViewerStyle = true;
  const viewerStyle = {
    viewer_bg: '#000000',
    viewer_color: '#999999',
    // viewer_float: 'on',
    // viewer_float_position: 'right',
    viewer_font: 1,
    viewer_fontline: 180,
    viewer_fontsize: 18,
    viewer_nextepi: 'on',
    viewer_paging: 1,
    viewer_weight: 400,
  };
  // Website font
  const setWebsiteFont = true;
  const websiteFont = "'Apple SD Gothic Neo', 'Pretendard', 'Spoqa Han Sans Neo', 'Noto Sans KR', 'Nanum Gothic', Arial, sans-serif";
  const websiteFontSelector = 'body, body.dark-mode, div#app, div#novel_drawing_page';
  // Change title
  const changeTitle = true;

  // #############################
  // # Set Cookie & LocalStorage #
  // #############################

  // Website style
  if (setWebsiteStyle) {
    setCookie('CURSOR', websiteStyle.novelchanCursor ? '1' : null);
    setCookie('DARKMODE_S', websiteStyle.darkWebsite ? '1' : null);
    setCookie('DARKMODE', websiteStyle.darkViewer ? '1' : null);
    setCookie('TOP100_ALL', websiteStyle.pinTop100 ? '1' : null);
    setCookie('COVER_VIEW', websiteStyle.blockCoverThumbnail ? 'OFF' : 'ON');
    setCookie('OPEN_THE_DOOR', websiteStyle.blockOpenTheDoor ? 'OFF' : 'ON');
    setCookie('BLOCK_WRITER_REVIEWS', websiteStyle.blockWriterReview ? 'ON' : 'OFF');
    setCookie('BLOCK_ILLUSTRATION', websiteStyle.blockIllustration ? 'ON' : 'OFF');
    setCookie('BLOCK_PARODY', websiteStyle.includeParodyInRanking ? 'ON' : 'OFF');
  }

  // Remove annoying popups
  setCookie('is_mybook_banner_modal', '1');
  setCookie('is_pling_expire_modal', '1');
  setCookie('is_pling_reward_expire_modal', '1');

  // Viewer style
  if (setViewerStyle) Object.entries(viewerStyle).forEach(([key, value]) => localStorage.setItem(key, value));

  // ##########################
  // # Hide & Remove Elements #
  // ##########################

  const hiddenSelectors = [];
  if (removeAnnoyances) hiddenSelectors.push(...annoyanceSelectors);
  if (removeUpsells) hiddenSelectors.push(...upsellSelectors);

  if (hiddenSelectors.length > 0) addStyle(`${hiddenSelectors.join(', ')} { display: none !important; }`);
  if (setWebsiteFont) addStyle(`${websiteFontSelector} { font-family: ${websiteFont} !important; }`);

  // ##############
  // # Head Title #
  // ##############

  const applyHeadTitle = () => {
    if (!window.location.href.startsWith('https://novelpia.com/viewer/')) return;

    const en = document.querySelector('div.menu-title-wrapper span.menu-top-tag')?.textContent?.trim();
    const et = document.querySelector('div.menu-title-wrapper div.menu-top-title')?.textContent?.trim();
    if (!en || !et) return;

    const title = `${en} - ${et}`;
    if (document.title !== title) document.title = title;
  };

  // ###################
  // # Dynamic Changes #
  // ###################

  const applyDynamicChanges = () => {
    if (changeTitle) applyHeadTitle();
  };

  const onReady = () => {
    hiddenSelectors.forEach(removeElements);
    applyDynamicChanges();

    if (changeTitle) new MutationObserver(applyDynamicChanges).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady, { once: true });
  else onReady();
})();
