<template>
  <div id="app">
    <button class="test" @click="test">测试</button>
  </div>
</template>

<script>
import { Popup } from '../dist/popup.es.js';
// import { Popup, Mask, Style, Dialog } from './components/popup/index.js';
// import Popup from './components/popup/index.js';

export default {
  name: 'app',
  mounted() {
    this.test();
  },
  methods: {
    cb() {
      console.log('其他');
    },
    test() {
      function callback() {
        setTimeout(() => {
          console.log('已关闭');
          popup3.remove();
        }, 500);
        console.log('500ms后会关闭');
      }
      const popup = new Popup({
        v: 'v1' + Math.floor(Math.random() * 10000) + new Date().valueOf(),
        autoShow: false, // 'undefined',undefined,0,'0',false,'false'
        content: 'Hello World 1'
      });

      const popup2 = new Popup({
        v: 'v2' + Math.floor(Math.random() * 10000) + new Date().valueOf(),
        content: 'Hello World 2',
        autoShow: true,
        autoClose: true,
        btns: [
          {
            name: '取消',
            callback: function() {
              console.log('取消');
            }
          },
          {
            name: '其他',
            callback: this.cb
          }
        ]
      });
      const popup3 = new Popup({
        v: 'v3' + Math.floor(Math.random() * 10000) + new Date().valueOf(),
        content: 'Hello World 3',
        autoShow: true,
        autoClose: false, //点击按钮回调处理完成之后是否自动关闭弹框  默认是true ; 如果回调是异步的 那么可设置为false 并再回调中手动关闭  不传入btns时会失效
        btns: [
          {
            name: '取消',
            callback: function() {
              console.log('取消');
            }
          },
          {
            name: '异步',
            callback
          },
          {
            name: '其他',
            callback: this.cb
          }
        ]
      });
      // const popup4 = new Popup('Hello World 4');
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
