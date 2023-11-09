import fs from 'fs';
import { test } from 'vitest';
import tokenizer from '../src/tokenizer';
import nodeGenerator, { Node } from '../src/node_generator';
import consoleHighlighter from './console_highlighter';

test('tokenize', () => {
  const cFile = './test/test.c';
  const cCode = fs.readFileSync(cFile, 'utf-8').toString();
  const tokens = tokenizer(cCode);
  const nodes = nodeGenerator(tokens);
  const highlighter = consoleHighlighter(nodes);
  console.log(highlighter);
});

function printNodes(nodes: Node[]) {
  for (const node of nodes) {
    if (node.type === 'whitespace') continue;
    else console.log(node);
  }
}
