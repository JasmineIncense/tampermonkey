// ==UserScript==
// @name         pocket comic扒图爬虫
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  pocket comic漫画网 tamper油猴脚本 上下翻页阅读器爬虫
// @author       zero_degree@foxmail.com
// @match        https://www.pocketcomics.com/comic*/chapter*/product
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pocketcomics.com
// @grant        none

// @require           https://unpkg.com/axios/dist/axios.min.js
// ==/UserScript==

// 文件命名计数
let count = 1
const down = (imgUrl) => {
  // 开启延时解决谷歌同时并发下载任务数不能超过10
  return new Promise(resolve => {
    setTimeout(async() => {
      // 使用axios下载文件，解决图片跨域下载问题
      const fileStream = await axios.get(imgUrl, {
        responseType: 'blob',
        withCredentials: false
      })
      if (!fileStream) {
        return false;
      }
      const url = URL.createObjectURL(fileStream.data);
      console.log(count, url)
      const aLink = document.createElement('a');
      aLink.href = url;
      aLink.setAttribute('download',count);
      aLink.click();
      URL.revokeObjectURL(url);
    
      count++
      resolve()
    }, 1000)
  })
}
const run = () => {
  setTimeout(async() => {
    const nodes = document.getElementsByClassName('wrap-canvas')

    for (let node of nodes) {
      const style = node.currentStyle || window.getComputedStyle(node, false)
      const imgUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "")
      await down(imgUrl)
    }
  }, 10000)
}

(function() {
  'use strict';

  // Your code here...
  run()
})();