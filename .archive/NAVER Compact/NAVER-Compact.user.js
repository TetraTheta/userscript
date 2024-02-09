// ==UserScript==
// @name         [OBSOLETE] NAVER Compact Main
// @namespace    https://github.com/TetraTheta
// @version      0.1.2.190324
// @description  Compact NAVER main screen by removing stuff
// @author       TetraTheta
// @updateURL    https://github.com/TetraTheta/TetraUserScripts/raw/main/.archive/NAVER%20Compact/NAVER-Compact.user.js
// @downloadURL  https://github.com/TetraTheta/TetraUserScripts/raw/main/.archive/NAVER%20Compact/NAVER-Compact.user.js
// @match        *://www.naver.com/*
// @match        *://search.naver.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

// Removing stuff from NAVER main screen
$("#news_cast").remove();
$(".column_bottom").remove();
$(".section_timesquare").remove();
$(".area_hotkeyword").remove();
$(".container").css('marginBottom', '300px');
$(".area_terms").css('height', 'auto');

// Removing stuff from NAVER search screen
$("#nxfr_htp").remove();
$("#_nx_footer_realtime").remove();
$(".footer_group .search_area").css('paddingTop', '23px');
$(".sub_pack").css('paddingBottom', '0px');
