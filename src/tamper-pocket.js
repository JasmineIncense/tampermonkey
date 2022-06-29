// ==UserScript==
// @name         pocket comic扒图爬虫
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  pocket comic漫画网 tamper油猴脚本 上下翻页阅读器爬虫
// @author       zero_degree@foxmail.com
// @match        https://www.pocketcomics.com/comic/*/chapter/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pocketcomics.com
// @grant        none
// ==/UserScript==

// 文件命名计数
let count = 1
const run = () => {
  setTimeout(() => {
    const nodes = document.getElementsByClassName('wrap-canvas')

    Array.prototype.map.call(nodes, (item) => {
      const style = item.currentStyle || window.getComputedStyle(item, false)
      const imgUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "")
      console.log(imgUrl);

      const download = document.createElement('a')
      download.setAttribute('download', count)
      download.href = imgUrl
      download.click()
      count++
    })
    run()
  }, 10000)
}

(function() {
  'use strict';

  // Your code here...
  run()
})();