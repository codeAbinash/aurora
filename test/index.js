import aurora from '../dist/index.js';

const codeBlock = document.getElementById('code-block');

const code = `
  int main() {
    return 0;
  }
`;

const result = aurora(code);
codeBlock.innerHTML = result;
