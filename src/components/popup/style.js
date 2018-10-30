import { createElement, commonData, getCss } from './utils';
const prefixCls = commonData().prefixCls; // 前缀
let queue = []; // 队列
/* Style */
function Style(v, autoShow) {
  if (
    (typeof autoShow === 'boolean' && !autoShow) ||
    autoShow === 0 ||
    autoShow === '0'
  ) {
    this.autoShow = false;
  } else {
    this.autoShow = true;
  }
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
      innerHTML: getCss(),
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
    style.parentNode.removeChild(style);
    // 删除队列子项
    queue.splice(0, 1);
  }
};
export default Style;
