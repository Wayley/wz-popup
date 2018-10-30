import { extend } from './utils';

import Mask from './mask';
import Style from './style';
import Dialog from './dialog';

let queue = [];
export function Popup(options) {
  let self = this;
  let defaults = {
    v: 'v' + Math.floor(Math.random() * 10000) + new Date().valueOf(), // 实例 戳id
    // autoShow: true, // 默认自动显示
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
    this.options = extend({}, defaults, options);
    if (
      (typeof options.autoShow === 'boolean' && !options.autoShow) ||
      options.autoShow === 0 ||
      options.autoShow === '0'
    ) {
      this.options.autoShow = false;
    } else {
      this.options.autoShow = true;
    }

    this.style = new Style({
      v: this.options.v,
      autoShow: !this.options.autoShow
    });
    this.mask = new Mask({
      opacity: 0.5,
      delay: 200,
      v: this.options.v,
      autoShow: this.options.autoShow
    });
    this.dialog = new Dialog(this.options);
    queue.push(this);

    // 销毁之前的实例
    if (queue.length > 1) {
      for (var i = 0; i < queue.length; i++) {
        queue[i].remove();
      }
    }
    // if (queue.length === 1 && this.options.autoShow) {
    //   this.show();
    // } else {
    //   queue = [];
    // }
  } catch (error) {
    console.log('配置项错误：' + error);
  }
}
Popup.prototype = {
  show() {
    if (this.isShow) return;
    this.style.show();
    this.mask.show();
    this.dialog.show();

    this.isShow = true;
  },
  remove() {
    this.isShow = false;

    this.mask.remove();
    this.dialog.remove();
    this.style.remove();
    queue.splice(0, 1);
  }
};

export default { Mask, Style, Dialog, Popup };
