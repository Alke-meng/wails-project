import config from '@/config'
import { createApp } from 'vue';
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 设置标题
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function setPageTitle(pageTitle) {
  const title = config.title || 'Vue3 el Admin'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

/**
 * 解析blob响应内容并下载
 * @param {*} response blob响应内容
 * @param {String} mimeType MIME类型
 */
export function download(response, mimeType = "csv") {
  const mimeMap = {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    zip: "application/zip",
    csv: "application/vnd.ms-excel;charset=utf-8",
  };
  const aLink = document.createElement("a");
  var blob = new Blob([response.data], { type: mimeMap[mimeType] });
  //从response的headers中获取filename, 后端Header("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
  var contentDisposition = decodeURI(response.headers["content-disposition"]);
  var result = patt.exec(contentDisposition);
  var fileName = result[1];
  fileName = fileName.replace(/"/g, "");
  var href = URL.createObjectURL(blob);
  aLink.href = href;
  aLink.setAttribute("download", fileName); // 设置下载文件名称
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}

//挂载组件
export function mountComponent(RootComponent) {
  const app = createApp(RootComponent);
  const root = document.createElement('div');

  document.body.appendChild(root);

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    },
  };
}

export function compareData(d1,d2,type) {
  var date1 = new Date(d1);
  var date2 = new Date(d2);
  var result = date1 > date2;

  if (result == true) {
    return (type == "min") ? d2 : d1;
  }
  return (type == "min") ? d1 : d2;

}

export function changeTime(limit){
  limit = parseFloat(limit)
  var size = "";
  if(limit > 1){
    size = limit.toFixed(2) + "s"
  }else if(limit*1000 > 1 && limit < 1000){
    size = (limit*1000).toFixed(2) + "ms"
  }else{
    size = (limit*1000*1000).toFixed(2) + "us"
  }

  var sizeStr = size + "";                        //转成字符串
  var index = sizeStr.indexOf(".");                    //获取小数点处的索引
  var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
  if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}

export function changeSize(limit){
  limit = parseInt(limit)
  var size = "";
  if(limit < 1024){                            //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B"
  }else if(limit < 1024 * 1024){            //小于0.1MB，则转化成KB
    size = (limit/1024).toFixed(2) + "K"
  }else if(limit < 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
    size = (limit/(1024 * 1024)).toFixed(2) + "M"
  }else{                                            //其他转化成GB
    size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "G"
  }

  var sizeStr = size + "";                        //转成字符串
  var index = sizeStr.indexOf(".");                    //获取小数点处的索引
  var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
  if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}