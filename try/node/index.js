const aurora = require('../../dist/index.umd.cjs').default;

const code = `
int main() {
   printf("Hello, World!");
   return 0; // This is a comment
}`;

console.log(aurora(code));
