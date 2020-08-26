function createElement(nodeName, options) {
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
function removeElementById(id) {
  if (typeof id === 'undefined') return;
  const element = document.getElementById(id);
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}
function bindEvent(element, eventName, callback, unbind) {
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
function opacityAnimation({ element, opacity, num = 10, delay = 200 }) {
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
const extend = (function() {
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
function checkBooleanFalse(check) {
  // 'undefined',undefined,0,'0',false,'false',
  return (
    typeof check === 'undefined' ||
    (typeof check === 'boolean' && !check) ||
    check === 0 ||
    check === '0' ||
    check === 'undefined' ||
    check === 'false'
  );
}
function commonData() {
  return {
    prefixCls: 'wz-popup'
  };
}
function getCss(prefixCls) {
  const css =
    '.' +
    prefixCls +
    '-mask {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: #000;\r\n  z-index: 999999;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  opacity: 0;\r\n}\r\n\r\n.' +
    prefixCls +
    ' {\r\n  /* display: none; */\r\n  opacity: 0;\r\n  opacity: 1;\r\n  width: 78%;\r\n  padding: 0 1rem;\r\n  transition: all 0.2s ease-in-out;\r\n  position: fixed;\r\n  z-index: 1000000;\r\n  top: 50%;\r\n  left: 50%;\r\n  margin: 0 auto;\r\n  margin-left: -39%;\r\n  background: #fff;\r\n  color: #555;\r\n  font-size: 14px;\r\n  font-family: -apple-system, Hiragino Sans GB, BlinkMacSystemFont, Segoe UI,\r\n    Roboto, Helvetica Neue, Arial, sans-serif;\r\n  border-radius: 5px;\r\n  -webkit-border-radius: 5px;\r\n  overflow: hidden;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.' +
    prefixCls +
    ' .' +
    prefixCls +
    '-header {\r\n  height: 45px;\r\n  line-height: 45px;\r\n  border-bottom: 1px solid #e3e3e3;\r\n}\r\n\r\n.' +
    prefixCls +
    ' .' +
    prefixCls +
    '-body {\r\n  margin: 25px 15px;\r\n}\r\n\r\n.' +
    prefixCls +
    ' .' +
    prefixCls +
    '-footer {\r\n  border-top: 1px solid #e3e3e3;\r\n}\r\n\r\n.' +
    prefixCls +
    ' .' +
    prefixCls +
    '-btn {\r\n  outline: 0 none;\r\n  text-decoration: none;\r\n  float: left;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  color: #999;\r\n}\r\n\r\n.' +
    prefixCls +
    '-btn + .' +
    prefixCls +
    '-btn {\r\n  position: relative;\r\n  color: #0b99ff;\r\n}\r\n\r\n.' +
    prefixCls +
    '-btn + .' +
    prefixCls +
    "-btn:before {\r\n  content: '';\r\n  height: 100%;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  border-left: 1px solid #e3e3e3;\r\n  -webkit-transform: scaleX(0.5);\r\n  transform: scaleX(0.5);\r\n}\r\n\r\n." +
    prefixCls +
    ' .' +
    prefixCls +
    '-center {\r\n  text-align: center;\r\n}\r\n';
  return css;
}

const prefixCls = commonData().prefixCls; // 前缀
let queue = []; // 队列
/* Style */
function Style(v, autoShow) {
  this.autoShow = !checkBooleanFalse(autoShow);

  this.v =
    typeof v === 'number' || typeof v === 'string'
      ? v
      : 'v' + Math.floor(Math.random() * 10000) + new Date().valueOf();
  this.isShow = false;
  this.id = `${prefixCls}` + '-style-' + this.v;
  queue.push(this);
  // 销毁之前的实例
  if (queue.length > 1) {
    for (var i = 0; i < queue.length; i++) {
      queue[i].remove();
    }
  }

  if (queue.length === 1 && this.autoShow) {
    this.show();
  } else {
    queue = [];
  }
}
Style.prototype = {
  show() {
    if (this.isShow) return;
    const style = createElement('style', {
      innerHTML: getCss(prefixCls),
      attr: {
        id: this.id
      }
    });
    document.body.appendChild(style);
    this.isShow = true;
  },
  remove() {
    this.isShow = false;
    const style = document.getElementById(this.id);
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
      // 删除队列子项
      queue.splice(0, 1);
    }
  }
};

const prefixCls$1 = commonData().prefixCls; // 前缀
let queue$1 = []; // 队列

/* Dialog */
function Dialog(opts) {
  let _this = this;

  //默认参数
  let defaults = {
    autoShow: true, // 默认自动显示
    delay: 200, // 动画延迟
    v: 'v' + Math.floor(Math.random() * 10000) + new Date().valueOf(), // 实例 戳id
    container: document.body, // 默认body位置
    title: '提示', // 默认标题文字
    content: '', // 提示内容
    btns: [
      {
        name: '好的',
        callback: function() {
          _this.remove();
        }
      }
    ], // 按钮列表[{name:'xx',callback:function(){}}]
    other: ''
  };
  try {
    // 特殊参数处理
    if (typeof opts === 'string' || typeof opts === 'number') {
      opts = { content: opts };
    }

    //opts合并到defaults上
    this.options = extend({}, defaults, opts);
    this.options.id = `${prefixCls$1}` + '-' + this.options.v;
    this.isShow = false;
    queue$1.push(this);

    // 销毁之前的实例
    if (queue$1.length > 1) {
      for (var i = 0; i < queue$1.length; i++) {
        queue$1[i].remove();
      }
    }

    if (queue$1.length === 1 && this.options.autoShow) {
      this.show();
    } else {
      queue$1 = [];
    }
  } catch (error) {
    console.log('配置项错误：' + error);
  }
}
Dialog.prototype = {
  show() {
    if (this.isShow) return;
    let self = this;
    const dialogHeader = createElement('header', {
      innerText: this.options.title,
      attr: {
        class: `${prefixCls$1}` + '-header' + ' ' + `${prefixCls$1}` + '-center'
      }
    });
    const dialogBody = createElement('div', {
      innerText: this.options.content,
      attr: {
        class: `${prefixCls$1}` + '-body'
      }
    });
    const dialogFooter = createElement('footer', {
      attr: {
        class: `${prefixCls$1}` + '-footer'
      }
    });
    var width = (100 / this.options.btns.length).toString() + '%';
    var style =
      this.options.btns.length == 1
        ? 'width:100%;color:#0b99ff'
        : 'width:' + width;
    for (var i = 0; i < this.options.btns.length; i++) {
      let btn = createElement('a', {
        innerText: this.options.btns[i]['name'],
        attr: {
          class: `${prefixCls$1}` + '-btn' + ' ' + `${prefixCls$1}` + '-center',
          style: style
        }
      });
      // 绑定事件
      (function(index) {
        bindEvent(btn, 'click', function(e) {
          var handle = self.options.btns[index]['callback'];
          handle.call(handle, self);
          if (self.options.autoClose) {
            self.remove();
            //
            const styleId = `${prefixCls$1}` + '-style-' + self.options.v;
            const maskId = `${prefixCls$1}` + '-mask-' + self.options.v;
            removeElementById(styleId);
            removeElementById(maskId);
          }
          e.preventDefault();
        });
      })(i);

      dialogFooter.appendChild(btn);
    }
    const dialogContainer = createElement('div', {
      attr: {
        id: this.options.id,
        class: `${prefixCls$1}`
      }
    });
    dialogContainer.appendChild(dialogHeader);
    dialogContainer.appendChild(dialogBody);
    dialogContainer.appendChild(dialogFooter);
    document.body.appendChild(dialogContainer);

    // 动态控制位置
    const marginTop = (dialogContainer.clientHeight / -2).toString();
    dialogContainer.style.marginTop = marginTop + 'px';
    // 显示帧动画
    opacityAnimation({
      element: dialogContainer,
      num: 1,
      delay: this.options.delay
    });
    this.isShow = true;
  },
  remove() {
    this.isShow = false;

    const dialog = document.getElementById(this.options.id);
    if (dialog && dialog.parentNode) {
      dialog.parentNode.removeChild(dialog);

      queue$1.splice(0, 1);
    }
  }
};

const prefixCls$2 = commonData().prefixCls; // 前缀
let queue$2 = []; // 队列

/* Mask */
function Mask(options) {
  this.isShow = false;
  // opacity的限定 默认0.6
  this.opacity =
    options && !!options.opacity && options.opacity > 0 && options.opacity <= 1
      ? options.opacity
      : 0.6;

  const v =
    (options && options.v) ||
    'v' + Math.floor(Math.random() * 10000) + new Date().valueOf();

  this.delay = (options && options.delay) || 200;
  // autoShow
  this.autoShow = !checkBooleanFalse(options.autoShow);

  this.id = `${prefixCls$2}` + '-mask-' + v;
  queue$2.push(this);
  // 销毁之前的实例
  if (queue$2.length > 1) {
    for (var i = 0; i < queue$2.length; i++) {
      queue$2[i].remove();
    }
  }

  if (queue$2.length === 1 && this.autoShow) {
    this.show();
  } else {
    queue$2 = [];
  }
}
Mask.prototype = {
  show() {
    if (this.isShow) return;
    let mask = createElement('div', {
      attr: {
        id: this.id,
        class: `${prefixCls$2}` + '-mask'
      }
    });

    document.body.appendChild(mask);
    opacityAnimation({
      element: mask,
      opacity: this.opacity,
      delay: this.delay
    });
    // 绑定事件
    bindEvent(mask, 'touchstart', function(e) {
      e.preventDefault(); // 事件阻止;
    });
    bindEvent(mask, 'touchmove', function(e) {
      e.preventDefault();
    });

    this.isShow = true;
  },
  remove() {
    this.isShow = false;
    const mask = document.getElementById(this.id);
    if (mask && mask.parentNode) {
      // 解绑事件
      bindEvent(
        mask,
        'touchstart',
        function(e) {
          e.preventDefault();
        },
        true
      );
      bindEvent(
        mask,
        'touchmove',
        function(e) {
          e.preventDefault();
        },
        true
      );

      mask.parentNode.removeChild(mask);
      // 删除队列子项
      queue$2.splice(0, 1);
    }
  }
};

let queue$3 = [];
function Popup(options) {
  let self = this;
  let defaults = {
    autoShow: true, //默认自动显示
    v: 'v' + Math.floor(Math.random() * 10000) + new Date().valueOf(), // 实例 戳id
    btns: [
      {
        name: '好的',
        callback: function() {
          self.remove();
        }
      }
    ]
  };

  this.isShow = false;
  try {
    if (typeof options === 'string' || typeof options === 'number') {
      options = { content: options };
    }
    let opt = extend({}, defaults, options);
    this.options = opt;

    // autoShow
    this.options.autoShow = !checkBooleanFalse(opt.autoShow);
    // autoClose
    this.options.autoClose = !checkBooleanFalse(opt.autoClose);

    // 三个实例
    this.style = new Style(this.options.v, this.options.autoShow);
    this.mask = new Mask({
      opacity: 0.5,
      delay: 200,
      v: this.options.v,
      autoShow: this.options.autoShow
    });
    this.dialog = new Dialog(this.options);

    queue$3.push(this);

    // 销毁之前的实例
    if (queue$3.length > 1) {
      for (var i = 0; i < queue$3.length; i++) {
        queue$3[i].remove();
      }
    }
    if (queue$3.length === 1) {
      // this.show();
    } else {
      queue$3 = [];
    }
  } catch (error) {
    console.log('配置项错误：' + error);
  }
}
Popup.prototype.show = function() {
  if (this.isShow) return;

  this.style.show();
  this.mask.show();
  this.dialog.show();

  this.isShow = true;
};
Popup.prototype.remove = function() {
  this.isShow = false;

  this.mask.remove();
  this.dialog.remove();
  this.style.remove();
  queue$3.splice(0, 1);
};

const Mask$1 = Style;
const Style$1 = Style;
const Dialog$1 = Dialog;
const Popup$1 = Popup;

export default Popup$1;
export { Dialog$1 as Dialog, Mask$1 as Mask, Popup$1 as Popup, Style$1 as Style };
