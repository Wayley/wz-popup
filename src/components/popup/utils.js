export function createElement(nodeName, options) {
  let element = document.createElement(nodeName || 'div');

  options && options.innerHTML && (element.innerHTML = options.innerHTML);
  options && options.innerText && (element.innerHTML = options.innerText);
  if (options && options.attr) {
    for (var key in options.attr) {
      element.setAttribute(key, options.attr[key]);
    }
  }
  return element;
}
export function bindEvent(element, eventName, callback, unbind) {
  let method;
  if (window.addEventListener) {
    if (unbind) {
      method = 'removeEventListener';
    } else {
      method = 'addEventListener';
    }
  } else {
    if (unbind) {
      method = 'detachEvent';
    } else {
      method = 'attachEvent';
    }
  }
  element[method](eventName, function(e) {
    callback(e);
  });
}
export function opacityAnimation({ element, opacity, num = 10, delay = 200 }) {
  if (!element) return;
  opacity = !!opacity && opacity > 0 && opacity <= 1 ? opacity : 1;
  let curOpcity = 0,
    increment = opacity / num; //增量
  let interval = setInterval(function() {
    curOpcity += increment;
    if (curOpcity >= opacity) {
      clearInterval(interval);
      element.style.opacity = opacity;
    } else {
      element.style.opacity = curOpcity;
    }
  }, delay / num);
}
export const extend = (function() {
  for (var p in { toString: null }) {
    //检查当前浏览器是否支持forin循环去遍历出一个不可枚举的属性，比如toString属性，如果不能遍历不可枚举的属性(IE浏览器缺陷)，那么forin循环不会进来
    return function extend(o) {
      for (var i = 1, len = arguments.length; i < len; i++) {
        var source = arguments[i];
        for (var prop in source) {
          o[prop] = source[prop];
        }
      }
      return o;
    };
  }
  //这些属性需要特殊检查一下，因为有的IE浏览器不支持for in去遍历这些属性
  var protoprops = [
    'toString',
    'valueOf',
    'constructor',
    'hasOwnProperty',
    'isPropertyOf',
    'propertyIsEnumerable',
    'toLocalString'
  ];
  return function patched_extend(o) {
    for (var i = 1, len = arguments.length; i < len; i++) {
      var source = arguments[i];
      for (var prop in source) {
        //先遍历常规的属性
        o[prop] = source[prop];
      }
      //检查是否有特殊属性，防止漏掉
      for (var j = 0, len2 = protoprops.length; j < len2; j++) {
        prop = protoprops[j];
        if (source.hasOwnProperty(prop)) {
          o[prop] = source[prop];
        }
      }
    }
    return o;
  };
})();

export function commonData() {
  return {
    prefixCls: 'wz-popup'
  };
}
export function getCss() {
  const css =
    ".wz-popup-mask {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: #000;\r\n  z-index: 999999;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  opacity: 0;\r\n}\r\n\r\n.wz-popup {\r\n  /* display: none; */\r\n  opacity: 0;\r\n  opacity: 1;\r\n  width: 78%;\r\n  padding: 0 1rem;\r\n  transition: all 0.2s ease-in-out;\r\n  position: fixed;\r\n  z-index: 1000000;\r\n  top: 50%;\r\n  left: 50%;\r\n  margin: 0 auto;\r\n  margin-left: -39%;\r\n  background: #fff;\r\n  color: #555;\r\n  font-size: 14px;\r\n  font-family: -apple-system, Hiragino Sans GB, BlinkMacSystemFont, Segoe UI,\r\n    Roboto, Helvetica Neue, Arial, sans-serif;\r\n  border-radius: 5px;\r\n  -webkit-border-radius: 5px;\r\n  overflow: hidden;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.wz-popup .wz-popup-header {\r\n  height: 45px;\r\n  line-height: 45px;\r\n  border-bottom: 1px solid #e3e3e3;\r\n}\r\n\r\n.wz-popup .wz-popup-body {\r\n  margin: 25px 15px;\r\n}\r\n\r\n.wz-popup .wz-popup-footer {\r\n  border-top: 1px solid #e3e3e3;\r\n}\r\n\r\n.wz-popup .wz-popup-btn {\r\n  outline: 0 none;\r\n  text-decoration: none;\r\n  float: left;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  color: #999;\r\n}\r\n\r\n.wz-popup-btn + .wz-popup-btn {\r\n  position: relative;\r\n  color: #0b99ff;\r\n}\r\n\r\n.wz-popup-btn + .wz-popup-btn:before {\r\n  content: '';\r\n  height: 100%;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  border-left: 1px solid #e3e3e3;\r\n  -webkit-transform: scaleX(0.5);\r\n  transform: scaleX(0.5);\r\n}\r\n\r\n.wz-popup .wz-popup-center {\r\n  text-align: center;\r\n}\r\n";
  return css;
}
export default {
  createElement,
  bindEvent,
  opacityAnimation,
  extend,
  commonData,
  getCss
};
