import { Plugin } from "prosemirror-state";

export function initPlugin(createFn) {
  const PREFIX = 'toastui-editor-';

  let isEnabled = true;
  let defaultIsEnabled = true;

  const plugin = (c) => ({
    markdownPlugins: [
      () => new Plugin({
        props: {
          handlePaste
        }
      })
    ],
    wysiwygPlugins: [
      () => new Plugin({
        props: {
          handlePaste
        }
      })
    ],
    toolbarItems: [
      {
        groupIndex: 3,
        itemIndex: 1,
        item: {
          name: 'checkbox',
          tooltip: 'checkbox',
          className: `${PREFIX}toolbar-icons color`,
          el: (() => {
            const el = document.createElement('input');
            el.setAttribute('type', 'checkbox');
            if (defaultIsEnabled) {
              el.setAttribute('checked', 'checked');
            }
            el.addEventListener('change', (e) => {
              isEnabled = e.currentTarget.checked;
            });
            return el;
          })()
        }
      },
    ],
  })

  const originalAddEvent = HTMLElement.prototype.addEventListener;
  HTMLElement.prototype.addEventListener = function (event, callback, opt) {
    if (
      (event === 'paste' && this.className === 'toastui-editor-pseudo-clipboard')
      // || (event === 'input' && this.className === 'toastui-editor-pseudo-clipboard')
    ) {
      originalAddEvent(event, (e) => {
        if (isEnabled) {
          handlePaste(undefined, e);
        } else {
          originalAddEvent.apply(this, arguments);
        }

      });
      return;
    }
    return originalAddEvent.apply(this, arguments);
  };

  const editor = createFn(plugin);

  HTMLElement.prototype.addEventListener = originalAddEvent;

  function handlePaste(_, clipboardEvent, __) {
    if (!isEnabled) {
      return false;
    }
    const text = clipboardEvent.clipboardData.getData('text');
    const html = clipboardEvent.clipboardData.getData('text/html');

    text.replace(/[^\p{L}\p{Zs}\p{N}\n\r]+/u, ' ')
    text.replace(/(\n)+/, '\n')
    text.replace(/[ ]+/, ' ')
    editor.insertText(text)

    return true
  }
}


// EXAMPLE
// initPlugin((p) => {
//   return (
//     new Editor({
//       el: document.querySelector('#editor'),
//       plugins: [p]
//     })
//   );
// });