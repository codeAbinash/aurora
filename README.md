# Aurora 🎨 / Core

![GitHub release (with filter)](https://img.shields.io/github/v/release/codeAbinash/aurora?color=limegreen)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/aurora-code?color=aa3aec)
![License](https://img.shields.io/github/license/codeAbinash/aurora?color=orangered)

![Aurora](https://try-aurora.vercel.app/aurora.png)

The C code highlighting engine for the web.

> If you are using React, use [aurora-react](https://github.com/codeAbinash/aurora-react) 🚀.

## Installation

### Using npm

```bash
npm install aurora-code
```

### Es module

```js
import aurora from 'aurora-code';
```

### CommonJS

```js
const aurora = require('aurora-code');
```

### Directly import Es module from CDN

```js
import aurora from 'https://cdn.jsdelivr.net/npm/aurora-code@latest/dist/index.js';
```

### Directly include Script tag from CDN

```html
<script src="https://cdn.jsdelivr.net/npm/aurora-code@latest/dist/index.umd.cjs" type="application/json"></script>
```

## Concept

The aurora function takes two arguments, the first one is the code to be highlighted and the second one is the options object.

```ts
aurora(code);
aurora(code, config);
```

> ### `aurora(code)` returns a string which is the highlighted code.

> Code is a string which is C code to be highlighted.
> Options is an object which is optional.

### Options

```ts
aurora(code, {
  mode: 'class'; // It uses classnames to highlight the code
}) // It is the default (Recommended)
```

```ts
aurora(code, {
  mode: 'inline'; // It uses inline styles to highlight the code
}) // It uses one dark pro theme if no styles are provided
```

```ts
aurora(code, {
  mode: 'inline', // It uses inline styles to highlight the code
  styles: {
    comment: '#808080',
    keyword: '#00FF00',
    name: '#0000FF',
    function: '#32CD32',
    string: '#FFC0CB',
  },
}); // Not recommended
```

```css
/* Custom theme */
.aurora-string {
  color: pink;
}
.aurora-keyword {
  color: lime;
}
```

> You can define your own styles for each token type. See the detailed [Configuration](#detailed-configuration).

## Usage

### Using React

If you are using React you can use

```tsx
import aurora from 'aurora-code';
import 'aurora-code/themes/oneDarkPro.css'; // (css file)
// or you may use your own css
...
...
  <pre>
    <code dangerouslySetInnerHTML={{ __html: aurora(h) }}></code>
  </pre>
...
...
```

> Use state variables and useEffect to update the code and prevent rerendering. Or you can use [aurora-react](https://github.com/codeAbinash/aurora-react) 🚀. It takes care of all these things.

### Using HTML and CSS

```html
<script type="module" src="index.js"></script>
<code id="code-block"></div>
```

```js
import aurora from 'https://cdn.jsdelivr.net/npm/aurora-code@latest/dist/index.js';
const codeBlock = document.getElementById('code-block');
const code = `
int main() {
   printf("Hello, World!");
   return 0;
}`;
codeBlock.innerHTML = aurora(code);
```

## Using Local Files

Download the https://cdn.jsdelivr.net/npm/aurora-code@latest/dist/index.umd.cjs and https://cdn.jsdelivr.net/npm/aurora-code@latest/dist/themes/oneDarkPro.css files and use them locally.

```html
<script src="../../dist/index.umd.cjs" defer></script>

<link rel="stylesheet" href="../../dist/themes/oneDarkPro.css" />

<body style="background-color: #070e22">
  <pre><code id="code-block"></code></pre>
  <script>
    document.body.onload = () => {
      const codeBlock = document.getElementById('code-block');
      const code = 'int main() {\n  printf("Hello World!");\n  return 0;\n}';
      codeBlock.innerHTML = aurora.default(code);
    };
  </script>
</body>
```

## Detailed Configuration

Here is an example of theme object for configuring the theme.

```ts
// One Dark Pro Theme
one_dark_pro = {
  comment: '#5c6370',
  comment_start: '#5c6370',
  comment_end: '#5c6370',
  preprocessor: '#c678dd',
  defined: '#d19a66',
  header_file: '#98c379',
  keyword: '#c678dd',
  name: '#ef596f',
  string: '#98c379',
  'quote single': '#98c379',
  'quote double': '#98c379',
  'quote angle': '#98c379',
  format_specifier: '#d19a66',
  number: '#d19a66',
  bin_prefix: '#ef596f',
  hex_prefix: '#ef596f',
  oct_prefix: '#ef596f',
  function: '#61afef',
  operator: '#c678dd',
  escape: '#56b6c2',
  'open_paren bracket0': '#d19a66',
  'open_curly bracket0': '#d19a66',
  'close_paren bracket0': '#d19a66',
  'close_curly bracket0': '#d19a66',
  'open_paren bracket1': '#c678dd',
  'open_curly bracket1': '#c678dd',
  'close_paren bracket1': '#c678dd',
  'close_curly bracket1': '#c678dd',
  'open_paren bracket2': '#56b6c2',
  'close_curly bracket2': '#56b6c2',
  'close_paren bracket2': '#56b6c2',
  'open_curly bracket2': '#56b6c2',
  'open_square bracket0': '#c678dd',
  'close_square bracket0': '#c678dd',
  'open_square bracket1': '#d19a66',
  'close_square bracket1': '#d19a66',
  'open_square bracket2': '#56b6c2',
  'close_square bracket2': '#56b6c2',
};
```

Here is an example of theme [css](https://github.com/codeAbinash/aurora/blob/main/public/themes/oneDarkPro.css).



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
