// ==UserScript==
// @name Fandom Garbage Cleaner
// @namespace tetratheta
// @version 1.0.0
// @description I hate Fandom's garbage elements
// @author TetraTheta
// @icon https://www.fandom.com/f2/assets/favicons/favicon-32x32.png?v=911c5c5b1b4cb66b20d97200726c1f13e56661f5
// @grant none
// @match *://*.fandom.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/fandom-garbage-cleanup.user.js
// @downloadURL https://tetratheta.github.io/userscript/fandom-garbage-cleanup.user.js
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
  // Don't run on iframes
  if (window.top != window.self) return

  // Inject style first
  const style = `
  #WikiaBar, #WikiaBarWrapper, #WikiaRailWrapper, #discord-widget, #mixed-content-footer, #top_leaderboard { display: none; }
  .ad-slot-placeholder, .bottom-ads-container, .global-explore-navigation, .global-footer__bottom, .global-navigation, .mcf-wrapper, .page-side-tool.content-size-toggle, .page__right-rail, .top-ads-container, .wds-global-footer, .wds-global-navigation__content-bar-left, .wikia-bar { display: none; }
  div[itemprop="video"] { display: none; }
  #WikiaMainContent { width: 100%; }
  `

  GM_addStyle(style)

  // Remove elements
  document.addEventListener('DOMContentLoaded', function () {
    const targets = [
      '#WikiaBar',
      '#WikiaBarWrapper',
      '#WikiaRailWrapper',
      '#discord-widget',
      '#mixed-content-footer',
      '#top_leaderboard',
      '.ad-slot-placeholder',
      '.bottom-ads-container',
      '.global-explore-navigation',
      '.global-footer__bottom',
      '.global-navigation',
      '.mcf-wrapper',
      '.page-side-tool.content-size-toggle',
      '.page__right-rail',
      '.top-ads-container',
      '.wds-global-footer',
      '.wds-global-navigation__content-bar-left',
      '.wikia-bar'
    ]

    targets.forEach(function (t) {
      let e;
      if (t.startsWith('#')) {
        console.log('Removing element with ID ' + t)
        e = document.getElementById(t.substr(1))
        if (e) {
          e.parentNode.removeChild(e)
        } else {
          console.warn('Element with ID ' + t + ' not found');
        }
      } else if (t.startsWith('.')) {
        console.log('Removing elements with Class ' + t)
        e = document.querySelectorAll(t)
        if (e.length > 0) {
          Array.from(e).forEach(function (elem) {
            elem.parentNode.removeChild(elem)
          })
        } else {
          console.warn('No elements found with class ' + t);
        }
      }
    })

    // Prevent preload of audio
    let ae = document.getElementsByTagName('audio')
    for (let i = 0; i < ae.length; i++) {
      ae[i].removeAttribute('preload')
      ae[i].setAttribute('preload', 'none')
    }
  })
})();
