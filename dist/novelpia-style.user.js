// ==UserScript==
// @name Novelpia Style
// @namespace tetratheta
// @version 1.2.2
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

(() => {
  const is_premium = true
  const font = "font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo', 'Pretendard', 'Noto Sans KR', 'Nanum Gothic', Arial, sans-serif !important;"
  const plus_free_path = '/event/plus_free'

  const addStyle = css => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
  const removeElements = selectors => {
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector)
      if (elements.length == 0) {
        console.log(`No elements found for ${selector}`)
        continue
      }
      for (const el of elements) el.remove()
      console.log(`Remove ${selector}`)
    }
  }

  const css_general = `
    body, body.collapse-menu.dark-mode, div#app { ${font} }
    #slide-banner-box, #slide-banner-box-mobile, .mybook-sub-nav.s_inv, .s-logo, a.header-gift .red-dot { display: none; }
    div.semi-blur { background-color: #e8e3f9; color: #000; }
    div.mybook-tab-container :nth-child(2), div.mybook-tab-container :nth-child(3) { display: none; }
    div.mybook-tab-container-m :nth-child(2), div.mybook-tab-container-m :nth-child(3) { display: none; }
  `
  const css_no_plus = `
    a[href$='/comic_main'],
    a[href$='/contest_list'],
    a[href$='/event/plus_free'],
    a[href$='/plus'],
    a[href$='/top100'] { display: none; }
  `
  addStyle(css_general)
  if (!is_premium) addStyle(css_no_plus)

  const removals_general = [
    '#slide-banner-box',
    '#slide-banner-box-mobile',
    '.mybook-sub-nav.s_inv',
    '.s-logo',
    'a.header-gift .red-dot',
  ]
  const removals_no_plus = [
    'a[href$="/comic_main"]',
    'a[href$="/contest_list"]',
    'a[href$="/event/plus_free"]',
    'a[href$="/plus"]',
    'a[href$="/top100"]',
  ]

  const applyReservationStyle = () => {
    document.querySelectorAll('.novelbox table tbody tr td div').forEach(div => {
      if (div.textContent.trim() === '예약회차 있음') {
        div.classList.add('semi-blur')
        div.style.backgroundColor = '#e8e3f9';
        div.style.color = '#000';
      }
    })
  }

  const handleAdClick = evt => {
    const el = evt.target
    if (!el.href && !el.onclick) return
    const hrefMatch = el.href?.endsWith(plus_free_path)
    const onClickMatch = el.onclick?.toString().includes(plus_free_path)
    const pathMatch = window.location.pathname.endsWith(plus_free_path)

    if (hrefMatch || onClickMatch || pathMatch) {
      evt.preventDefault()
      el.style.display = 'none'
      console.log('Blocked ad link:', el)
    }
  }

  const onReady = () => {
    removeElements(removals_general)
    if (!is_premium) removeElements(removals_no_plus)
    applyReservationStyle()
    document.body.addEventListener('click', handleAdClick, true)
    localStorage.setItem('viewer_paging', 1)
    document.body.style.cssText += font;
  }

  const observer = new MutationObserver(applyReservationStyle)
  observer.observe(document.documentElement, { childList: true, subtree: true })
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady)
  else onReady()
})();
