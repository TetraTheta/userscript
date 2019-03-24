// ==UserScript==
// @name         NAVER Compact Main
// @namespace    https://github.com/TetraTheta
// @version      0.1.1T-190324
// @description  Compact NAVER main screen by removing stuff
// @author       TetraTheta
// @match        *://*.naver.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

// Removing stuff from NAVER main screen
$("#news_cast").remove();
$(".column_bottom").remove();
$(".section_timesquare").remove();
$(".area_hotkeyword").remove();
$(".container").css('marginBottom','300px');
$(".area_terms").css('height','auto');

// Removing stuff from NAVER search screen
$("#nxfr_htp").remove();
$("#_nx_footer_realtime").remove();
$(".footer_group .search_area").css('paddingTop','23px');
$(".sub_pack").css('paddingBottom','0px');
