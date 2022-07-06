// ==UserScript==
// @name         fuz扒图爬虫
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  COMIC FUZ漫画网 tamper油猴脚本 左右翻页阅读器爬虫
// @author       零度 （QQ 2292788289）
// @match        https://comic-fuz.com/magazine/viewer/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=comic-fuz.com
// @grant        none
// ==/UserScript==

// 文件命名计数
let count = 1
const run = () => {
  setTimeout(() => {
    const nodes = document.getElementsByClassName('sc-gKXOVf AVvMm')
    let node

    if (!nodes || !nodes.length) {
      run()
      return
    }
    if (nodes.length <= 2 ) {
      node = nodes[1] // 取第二个节点数据
    } else {
      node = nodes[0] // 首页，取第一个节点数据
    }
    const imgs = node.getElementsByTagName('img')
    Array.prototype.map.call(imgs, (item) => {
      const imgUrl = item.src

      const download = document.createElement('a');
      download.setAttribute('download', count);
      download.href = imgUrl;
      download.click();
      count++
    })
    run()
  }, 4000)
}

(function() {
  'use strict';

  run()
  // Your code here...
})();