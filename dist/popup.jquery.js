// Popup component for jQuery
(function($) {
  let queue = []; //实例对象队列

  function getCss(prefixCls) {
    const css =
      '.' +
      prefixCls +
      '-mask {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: #000;\r\n  z-index: 999999;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  opacity: 0.6;\r\n}\r\n\r\n.' +
      prefixCls +
      ' {\r\n  width: 78%;\r\n  padding: 0 1rem;\r\n  opacity: 1;\r\n  -webkit-transition: all 0.2s ease-in-out;\r\n  transition: all 0.2s ease-in-out;\r\n  position: fixed;\r\n  z-index: 1000000;\r\n  top: 50%;\r\n  left: 50%;\r\n  margin: 0 auto;\r\n  margin-left: -39%;\r\n  background: #fff;\r\n  color: #555;\r\n  font-size: 14px;\r\n  font-family: -apple-system, Hiragino Sans GB, BlinkMacSystemFont, Segoe UI,\r\n    Roboto, Helvetica Neue, Arial, sans-serif;\r\n  border-radius: 5px;\r\n  -webkit-border-radius: 5px;\r\n  overflow: hidden;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n}\r\n\r\n.' +
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
  function btnHandle(_this) {
    // _this 当前实例
    var $footer = $('.wz-popup-footer');
    $footer.find('a.wz-popup-btn').each(function(i, element) {
      (function(index) {
        $(element).bind('click', function(e) {
          var handle = _this.options.btns[index]['callback'];
          handle.call(handle, _this);
          if (_this.options.autoClose) _this.hide();
          e.preventDefault();
        });
      })(i);
    });
  }
  /* Style */
  var Style = {
    isShow: false,
    show(v) {
      v = v || 'v' + Math.floor(Math.random() * 10000) + new Date().valueOf();
      this.id = 'wz-popup-style-' + v;

      if (this.isShow) return;
      var style_ = document.createElement('style');
      $('body').prepend(
        $(style_)
          .attr('id', this.id)
          .html(getCss('wz-popup'))
      );
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
      $('#' + this.id).remove();
    }
  };
  /* Mask */
  var Mask = {
    isShow: false,
    show(opacity, v) {
      v = v || 'v' + Math.floor(Math.random() * 10000) + new Date().valueOf();
      this.id = 'wz-popup-mask-' + v;
      if (this.isShow) return;
      opacity = opacity ? ' style="opacity:' + opacity + ';"' : '';
      var maskStr =
        '<div id=' + this.id + ' class="wz-popup-mask" ' + opacity + '></div>';
      $('body').prepend(maskStr);
      // Mask 事件阻止
      $('#' + this.id)
        .bind('touchstart', function(e) {
          e.preventDefault();
        })
        .bind('touchmove', function(e) {
          e.preventDefault();
        });
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
      $('#' + this.id)
        .unbind('touchstart')
        .unbind('touchmove')
        .remove();
    }
  };
  /* Popup */
  function Popup(opts) {
    //默认参数
    var defaults = {
      id: '',
      v: 'v' + Math.floor(Math.random() * 10000) + new Date().valueOf(),
      autoShow: true,
      autoClose: true,
      container: document.body, // 默认body位置
      title: '提示', // 默认标题文字
      content: '', // 提示内容
      btns: [] // 按钮列表[{name:'xx',callback:function(){}}]
    };
    var _this = this;
    try {
      // 特殊参数处理
      if (typeof opts === 'string' || typeof opts === 'number') {
        opts = {
          content: opts,
          btns: [
            {
              name: '好的',
              callback: function() {
                _this.hide();
              }
            }
          ]
        };
      }

      //opts合并到defaults上
      var options = $.extend({}, defaults, opts);

      this.options = options;
      //
      this.options.id = 'wz-popup-' + this.options.v;
      queue.push(this);

      // 销毁之前的实例
      if (queue.length > 1) {
        for (var i = 0; i < queue.length; i++) {
          queue[i].hide();
        }
      }

      if (queue.length === 1 && this.options.autoShow) {
        this.init();
      } else {
        queue = [];
      }
    } catch (error) {
      console.log('配置项错误：' + error);
    }
  }
  Popup.prototype.init = function() {
    this.show();
  };
  Popup.prototype.show = function() {
    var str = '<div class="wz-popup" id="wz-popup-' + this.options.v + '">';

    str +=
      '<header class="wz-popup-header wz-popup-center">' +
      this.options.title +
      '</header>';
    str += '<div class="wz-popup-body">' + this.options.content + '</div>';

    str += '<footer class="wz-popup-footer">';
    var width = (100 / this.options.btns.length).toString() + '%';

    var style =
      this.options.btns.length == 1
        ? 'width:100%;color:#0b99ff'
        : 'width:' + width;
    for (var i = 0; i < this.options.btns.length; i++) {
      str +=
        '<a class="wz-popup-btn wz-popup-center" style="' +
        style +
        '">' +
        this.options.btns[i]['name'] +
        '</a>';
    }
    str += '</footer>';

    str += '</div>';
    //
    Mask.show(0.6, this.options.v);
    Style.show(this.options.v);

    $(this.options.container).append($(str));
    var $popup = $('#' + this.options.id);
    var marginTop = ($popup.height() / -2).toString() + 'px';
    $popup.css('margin-top', marginTop);
    $popup.fadeIn(5000);

    // btns 绑定事件
    btnHandle(this);
  };
  Popup.prototype.hide = function() {
    $('#' + this.options.id).fadeOut(120);
    Mask.hide();
    this.remove();
    Style.hide();
  };
  Popup.prototype.remove = function() {
    $('#' + this.options.id).remove();
    queue.splice(0, 1);
  };
  // 暴露方法
  $.Popup = $.fn.Popup = (function(Popup) {
    return Popup;
  })(Popup);
})(jQuery);
