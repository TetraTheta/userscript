// ==UserScript==
// @name         DCinside NoIMG Recovery
// @namespace    https://github.com/TetraTheta
// @version      0.1.0.2T-190324
// @description  Replacing NoIMG error and force-loading original image
// @author       TetraTheta
// @include      *.dcinside.co.kr/*
// @include      *.dcinside.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

document.onreadystatechange = function() {
    if (document.readyState === "interactive") {
        var data = document.getElementsByTagName("img");
        for(var i=0;i<data.length;i++){
            if (data[i].src.indexOf("http://dcimg") != -1 && data[i].src.indexOf(".dcinside.co.kr/viewimage.php?") != -1) {
                data[i].src="http://image.dcinside.com/viewimage.php?"+data[i].src.split("?")[1];
            }
        }
    }
}
