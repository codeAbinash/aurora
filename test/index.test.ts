import fs from 'fs';
import { test } from 'vitest';
import { Node } from '../src/node_generator';
import tokenizer from '../src/tokenizer';
import consoleHighlighter from './console_highlighter';

test('tokenize', () => {
  const cFile = './test/test.c';
  const cCode = fs.readFileSync(cFile, 'utf-8').toString();
  const now = performance.now();
  const tokens = tokenizer(cCode);
  // const nodes = nodeGenerator(tokens);
  const highlighter = consoleHighlighter(tokens);
  console.log(highlighter);
  console.log(performance.now() - now);
});

function printNodes(nodes: Node[]) {
  for (const node of nodes) {
    if (node.type === 'whitespace') continue;
    else console.log(node);
  }
}
