<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button class="test" @click="test">测试</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import index from '../dist/popup.es.js';
// import { Popup, Mask, Style, Dialog } from './components/popup/index.js';
import Index from './components/popup/index.js';

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted() {
    this.test();
  },
  methods: {
    test() {
      let v = '111234567';
      let style = new Index.Style(v, true, 'ddd');
      let mask = new Index.Mask({ v });
      // let mask2 = new Index.Mask();
      // console.log(mask2);

      // mask2.show();
      let dialog = new Index.Dialog({ content: '你哈哈哈哈', autoShow: false });
      let dialog2 = new Index.Dialog({ content: '你哈哈哈哈' });
      // dialog.show();
      // dialog.show();
      // let dialog2 = new Index.Popup('2222');
      let dialog3 = new Index.Dialog({
        title: 'nnh',
        autoShow: true,
        v,
        content: '嫩荣荣荣荣',
        btns: [
          {
            name: '取消',
            callback: () => {
              console.log('qx');
            }
          },
          {
            name: '确定',
            callback: () => {
              console.log('确定');
            }
          }
        ]
      });
      // dialog3.show();
      // const popup = new Popup('活动是法律框架');
      // const popup2 = new Popup('撒法法');
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
