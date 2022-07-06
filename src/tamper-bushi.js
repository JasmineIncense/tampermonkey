// ==UserScript==
// @name         comicbushi扒图爬虫
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  comicbushi漫画网 tamper油猴脚本 左右翻页阅读器爬虫
// @author       zero_degree@foxmail.com
// @match        https://comicbushi-web.com/episode/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dlsite.com
// @grant        none
// ==/UserScript==


// 将base64数据转换为文件
const base64ImgtoFile = (dataurl, filename = "file") => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split("/")[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
}

// 文件命名计数
let count = 1
const run = () => {
  setTimeout(() => {
    const content = document.getElementById('viewport')
    const nodes = document.querySelectorAll('canvas.page-image')

    Array.prototype.map.call(nodes, (canvas) => {
      // 解决图片跨域问题
      // img.setAttribute('crossOrigin', 'anonymous')
      const dataURL = canvas.toDataURL();

      const file = base64ImgtoFile(dataURL); // 得到File对象
      const imgUrl =
        window.webkitURL.createObjectURL(file) ||
        window.URL.createObjectURL(file);
      console.log(imgUrl);

      const download = document.createElement('a');
      download.setAttribute('download', count);
      download.href = imgUrl;
      download.click();
      count++
    })
  }, 15000)
}

(function() {
  'use strict';

  // Your code here...
  run()
})();