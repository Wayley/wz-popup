import { extend, checkBooleanFalse } from './utils';

import Mask from './mask';
import Style from './style';
import Dialog from './dialog';
let ii = 0;
let queue = [];
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

    queue.push(this);
    ii++;
    console.log(ii, 'iiiiiiiiiiiiii');

    // 销毁之前的实例
    if (queue.length > 1) {
      for (var i = 0; i < queue.length; i++) {
        queue[i].remove();
      }
    }
    if (queue.length === 1) {
      // this.show();
    } else {
      queue = [];
    }
  } catch (error) {
    console.log('配置项错误：' + error);
  }
}
Popup.prototype.show = function() {
  console.log(this, this.isShow, 'thisssss');

  if (this.isShow) return;
  console.log('has returned');

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
  queue.splice(0, 1);
};

export default Popup;
