# Install

```sh
$ npm i tui-sanatize-clipboard-plugin
```

# Usage

```js
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

import { initPlugin } from 'tui-sanatize-clipboard-plugin';


const editor = initPlugin((p) => new Editor({
  el: document.querySelector('#editor'),
  plugins: [p]
}));
```