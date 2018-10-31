import {
  createElement,
  bindEvent,
  opacityAnimation,
  checkBooleanFalse,
  commonData
} from './utils';
const prefixCls = commonData().prefixCls; // 前缀
let queue = []; // 队列

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

  this.id = `${prefixCls}` + '-mask-' + v;
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
Mask.prototype = {
  show() {
    if (this.isShow) return;
    let mask = createElement('div', {
      attr: {
        id: this.id,
        class: `${prefixCls}` + '-mask'
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
      queue.splice(0, 1);
    }
  }
};
export default Mask;
