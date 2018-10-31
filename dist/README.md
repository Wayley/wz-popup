## Install

```
npm install wz-popup --save
```

## Usage

```js
import Popup from 'wz-popup';
function callback() {
  console.log('callback');
  setTimeout(() => {
    console.log('已关闭');
    popup.remove();
  }, 500);
  console.log('500ms后会关闭');
}
const popup = new Popup({
  autoShow: false, // 'undefined',undefined,0,'0',false,'false'
  autoClose: false, //点击按钮回调处理完成之后是否自动关闭弹框  默认是true ; 如果回调是异步的 那么可设置为false 并再回调中手动关闭  不传入btns时会失效
  title: '这是头部提示信息',
  content: '这是内容内容内容内容内容',
  btns: [
    {
      name: '取消',
      callback: () => {
        console.log('取消');
      }
    },
    {
      name: '确定',
      callback: function() {
        console.log('确定');
      }
    },
    {
      name: '异步关闭',
      callback
    }
  ]
});
`` instance methods
popup.show();
popup.remove();
```

## options

- `autoShow`: auto show the popup or not. (default:`true`)
- `title`: the title of the popup. (default:`提示`)
- `content`: the content of the popup.
- `btns`: the buttons for user to handle their code. (default:[{name:'好的',callback:function(){popup.remove()}}])

### Style

```js
import { Style } from 'wz-popup';

const style = new Style(v, autoShow);

`` instance methods
style.show();
style.remove();
```

- `v`:('unrequired')[number,string] the version id that should be unique
- `autoShow`:('unrequired') [boolean] the flag which makes the instance show of its own or not.(default:`true`)

### Mask

```js
import { Mask } from 'wz-popup';

const style = new Mask(v, autoShow);

`` instance methods
style.show();// this method will not work while the autoShow argument is true or the instance has shown
style.remove();
```

- `v`:('unrequired')[number,string] the version id that should be unique
- `autoShow`:('unrequired') [boolean] the flag which makes the instance show of its own or not.(default:`true`)
