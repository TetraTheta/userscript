// ==UserScript==
// @name         [OBSOLETE] DCinside NoIMG Recovery
// @namespace    https://github.com/TetraTheta
// @version      0.1.2.190324
// @description  Replacing 'No IMG' error and force-loading original image
// @author       TetraTheta
// @updateURL    https://github.com/TetraTheta/TetraUserJS/raw/master/scripts/DCinside_NoIMG_Recovery.user.js
// @downloadURL  https://github.com/TetraTheta/TetraUserJS/raw/master/scripts/DCinside_NoIMG_Recovery.user.js
// @include      *.dcinside.co.kr/*
// @include      *.dcinside.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    var data = document.getElementsByTagName("img");
    for (var i = 0; i < data.length; i++) {
      if (data[i].src.indexOf("http://dcimg") != -1 && data[i].src.indexOf(".dcinside.co.kr/viewimage.php?") != -1) {
        data[i].src = "http://image.dcinside.com/viewimage.php?" + data[i].src.split("?")[1];
      }
    }
  }
}
