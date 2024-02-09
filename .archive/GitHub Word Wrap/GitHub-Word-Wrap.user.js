// ==UserScript==
// @name         GitHub Word Wrap
// @namespace    https://github.com/TetraTheta
// @version      0.1.0.221005
// @description  Apply word wrap in GitHub code pages
// @author       TetraTheta
// @updateURL    https://github.com/TetraTheta/TetraUserScripts/raw/main/.archive/GitHub%20Word%20Wrap/GitHub-Word-Wrap.user.js
// @downloadURL  https://github.com/TetraTheta/TetraUserScripts/raw/main/.archive/GitHub%20Word%20Wrap/GitHub-Word-Wrap.user.js
// @match        *://github.com/*
// @match        *://gist.github.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
  .blob-code-inner,
  .markdown-body pre > code,
  .markdown-body .highlight > pre {
    white-space: pre-wrap !important;
    word-break: break-all !important;
    overflow-wrap: break-word !important;
    display: block !important;
  }
  td.blob-code-inner {
    display: table-cell !important;
  }
`);
