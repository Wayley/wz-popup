import {
  createElement,
  removeElementById,
  bindEvent,
  opacityAnimation,
  extend,
  commonData
} from './utils';
const prefixCls = commonData().prefixCls; // 前缀
let queue = []; // 队列

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
    this.options.id = `${prefixCls}` + this.options.v;
    this.isShow = false;
    queue.push(this);

    // 销毁之前的实例
    if (queue.length > 1) {
      for (var i = 0; i < queue.length; i++) {
        queue[i].remove();
      }
    }

    if (queue.length === 1 && this.options.autoShow) {
      this.show();
    } else {
      queue = [];
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
        class: `${prefixCls}` + '-header' + ' ' + `${prefixCls}` + '-center'
      }
    });
    const dialogBody = createElement('div', {
      innerText: this.options.content,
      attr: {
        class: `${prefixCls}` + '-body'
      }
    });
    const dialogFooter = createElement('footer', {
      attr: {
        class: `${prefixCls}` + '-footer'
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
          class: `${prefixCls}` + '-btn' + ' ' + `${prefixCls}` + '-center',
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
            const styleId = `${prefixCls}` + '-style-' + self.options.v;
            const maskId = `${prefixCls}` + '-mask-' + self.options.v;
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
        class: `${prefixCls}`
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

      queue.splice(0, 1);
    }
  }
};
export default Dialog;
