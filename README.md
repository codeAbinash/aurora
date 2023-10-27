# Aurora 🎨 / Core

The C code highlighting engine for the web.

> If you are using React, use [aurora-react](https://github.com/codeAbinash/aurora-react) 🚀.

<!-- ![Aurora](https://codeAbinash.github.io/aurora/images/banner.jpg) -->

## Installation

### Using npm

```bash
npm install aurora-code
```

## Usage

### Highlight using classes (recommended)

```ts
import aurora from '../dist/index.js';

const codeBlock = document.getElementById('code-block');

const code = `
  int main() {
    return 0;
  }
`;

const result = aurora(code);
codeBlock.innerHTML = result;
```

### Highlight using inline styles

```ts
aurora(code);
```

TO be continued...
