# wz-popup

## Install

```bash
$ npm install wz-popup
# or
$ yarn add wz-popup
```

## Usage

### Instance

```js
import { Popup } from 'wz-popup';

const instance = new Popup({
  /*
   * Options
  */
});
```

### Initial Options

| 属性      | 说明                                     | 类型                                         | 默认值 | 其他                                                                                          |
| :-------- | :--------------------------------------- | :------------------------------------------- | :----- | :-------------------------------------------------------------------------------------------- |
| v         | 唯一标识                                 | `String | Number`                            |        |
| content   | 内容                                     | `String | Number | Node`                     | `-`    |
| autoShow  | 是否初始化完成就弹出                     | `Boolean & Like Boolean(eg:0, undefined...)` |        |
| autoClose | 点击按钮回调处理完成之后是否自动关闭弹框 | `Boolean & Like Boolean(eg:0, undefined...)` | `true` | `如果回调是异步的 那么可设置为false 并再回调中手动关闭(instance.remove()) 不传入btns时会失效` |
| btns      |                                          | `Array`                                      | `-`    | `[ { name: Any, callback: Function } ]`                                                       |

### Instance Methods

#### Show

```js
instance.show();
```

### remove

```js
instance.remove();
```

### Examples

```js
const instance_1 = new Popup('This Is Content!');
```

```js
const instance_2 = new Popup({
  v: 'v2' + Math.floor(Math.random() * 10000) + new Date().valueOf(),
  autoShow: false,
  content: 'This Is Content!',
});
```

```js
const instance_3 = new Popup({
  v: 'v3' + Math.floor(Math.random() * 10000) + new Date().valueOf(),
  content: 'This Is Content!',
  autoShow: true,
  autoClose: true,
  btns: [
    {
      name: '取消',
      callback: function() {
        console.log('取消');
      },
    },
    {
      name: '确定',
      callback: function() {
        console.log('OK');
      },
    },
  ],
});
```

```js
const instance_4 = new Popup({
  v: 'v4' + Math.floor(Math.random() * 10000) + new Date().valueOf(),
  content: 'This Is Content!',
  autoShow: true,
  autoClose: false,
  btns: [
    {
      name: '取消',
      callback: function() {
        console.log('取消');
      },
    },
    {
      name: '上报',
      callback: function() {
        setTimeout(() => {
          console.log('上报成功');
          // 手动关闭
          instance_4.remove();
        }, 500);
        console.log('500ms后会关闭');
      },
    },
  ],
});
```
