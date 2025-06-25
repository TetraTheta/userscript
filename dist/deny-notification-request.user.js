// ==UserScript==
// @name Deny Notification Request
// @namespace tetratheta
// @version 1.0.0
// @description I don't need it
// @author TetraTheta
// @grant none
// @match *://*.joins.com/*
// @match *://*.jtbc.co.kr/*
// @match *://*.kbs.co.kr/*
// @match *://*.youtube.com/*
// @run-at document-start
// @noframes
// @updateURL https://tetratheta.github.io/userscript/deny-notification-request.user.js
// @downloadURL https://tetratheta.github.io/userscript/deny-notification-request.user.js
// ==/UserScript==

'use strict'

(function () {
  Notification.requestPermission = () => { return Promise.resolve('denied') }
  if (navigator.permissions) {
    navigator.permissions.query = (params) => {
      if (params.name === 'notifications') {
        return Promise.resolve({ state: 'denied' })
      }
      return navigator.permissions.query(params)
    }
  }
})();
