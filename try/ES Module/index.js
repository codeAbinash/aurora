import aurora from '../../dist/index.js';
const codeBlock = document.getElementById('code-block');

const code = `
int main() {
   printf("Hello, World!");
   return 0; // This is a comment
}`;

codeBlock.innerHTML = aurora(code);
