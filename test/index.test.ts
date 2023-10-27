import fs from 'fs';
import { test } from 'vitest';
import tokenizer from '../src/tokenizer';
import nodeGenerator, { Node } from '../src/node_generator';

test('tokenize', () => {
  const cFile = './test/example.c';
  const cCode = fs.readFileSync(cFile, 'utf-8').toString();
  const tokens = tokenizer(cCode);
  const nodes = nodeGenerator(tokens);
  printNodes(nodes);
});

function printNodes(nodes: Node[]) {
  for (const node of nodes) {
    if (node.type === 'whitespace') continue;
    else console.log(node);
  }
}
