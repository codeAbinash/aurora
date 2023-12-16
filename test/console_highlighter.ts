import pc from 'picocolors';
import { Node } from '../src/node_generator';

function sampleColors(nodes: Node[]) {
  console.log(pc.red('Hello world!'));
  console.log(pc.green('Hello world!'));
  console.log(pc.yellow('Hello world!'));
  console.log(pc.blue('Hello world!'));
  console.log(pc.magenta('Hello world!'));
  console.log(pc.cyan('Hello world!'));
  console.log(pc.white('Hello world!'));
  console.log(pc.gray('Hello world!'));
  console.log(pc.black('Hello world!'));
  console.log(pc.bgBlack(pc.white('Hello world!')));
  console.log(pc.bgRed(pc.white('Hello world!')));
  console.log(pc.bgGreen(pc.white('Hello world!')));
  console.log(pc.bgYellow(pc.white('Hello world!')));
  console.log(pc.bgBlue(pc.white('Hello world!')));
  console.log(pc.bgMagenta(pc.white('Hello world!')));
  console.log(pc.bgCyan(pc.white('Hello world!')));
  console.log(pc.bgWhite(pc.black('Hello world!')));

  console.log(pc.bold('Hello world!'));
  console.log(pc.dim('Hello world!'));
  console.log(pc.italic('Hello world!'));
  console.log(pc.underline('Hello world!'));
  console.log(pc.inverse('Hello world!'));
  console.log(pc.hidden('Hello world!'));
  console.log(pc.strikethrough('Hello world!'));
  console.log(pc.reset('Hello world!'));
}

const colorMap = {
  comment_start: (s: string) => pc.italic(pc.gray(s)),
  comment_end: (s: string) => pc.italic(pc.gray(s)),
  comment: (s: string) => pc.italic(pc.gray(s)),
  preprocessor: (s: string) => pc.bold(pc.magenta(s)),
  defined: (s: string) => pc.bold(pc.yellow(s)),
  header_file: (s: string) => pc.bold(pc.green(s)),
  keyword: (s: string) => pc.bold(pc.magenta(s)),
  name: (s: string) => pc.bold(pc.red(s)),
  string: (s: string) => pc.bold(pc.green(s)),
  quote: (s: string) => pc.bold(pc.green(s)),
  'quote double': (s: string) => pc.bold(pc.green(s)),
  'quote single': (s: string) => pc.bold(pc.green(s)),
  format_specifier: (s: string) => pc.yellow(s),
  number: (s: string) => pc.yellow(s),
  bin_prefix: (s: string) => pc.bold(pc.red(s)),
  oct_prefix: (s: string) => pc.bold(pc.red(s)),
  hex_prefix: (s: string) => pc.bold(pc.red(s)),
  bin_literal: (s: string) => pc.dim(pc.yellow(s)),
  oct_literal: (s: string) => pc.yellow(s),
  hex_literal: (s: string) => pc.yellow(s),
  function: (s: string) => pc.cyan(s),
  operator: (s: string) => pc.bold(pc.magenta(s)),
  escape: (s: string) => pc.cyan(s),
  comma: (s: string) => pc.white(s),
  semicolon: (s: string) => pc.white(s),
  colon: (s: string) => pc.dim(s),
  hash: (s: string) => pc.bold(pc.magenta(s)),

  'open_paren bracket0': (s: string) => pc.cyan(s),
  'close_paren bracket0': (s: string) => pc.cyan(s),
  'open_paren bracket2': (s: string) => pc.yellow(s),
  'close_paren bracket2': (s: string) => pc.yellow(s),
  'open_paren bracket1': (s: string) => pc.bold(pc.magenta(s)),
  'close_paren bracket1': (s: string) => pc.bold(pc.magenta(s)),

  'open_curly bracket1': (s: string) => pc.bold(pc.magenta(s)),
  'close_curly bracket1': (s: string) => pc.bold(pc.magenta(s)),
  'open_curly bracket0': (s: string) => pc.yellow(s),
  'close_curly bracket0': (s: string) => pc.yellow(s),
  'open_curly bracket2': (s: string) => pc.cyan(s),
  'close_curly bracket2': (s: string) => pc.cyan(s),

  'open_square bracket0': (s: string) => pc.bold(pc.magenta(s)),
  'close_square bracket0': (s: string) => pc.bold(pc.magenta(s)),
  'open_square bracket1': (s: string) => pc.yellow(s),
  'close_square bracket1': (s: string) => pc.yellow(s),
  'open_square bracket2': (s: string) => pc.cyan(s),
  'close_square bracket2': (s: string) => pc.cyan(s),
  // whitespace: (s: string) => pc.bgMagenta(pc.white(s)),
};

export default function consoleHighlighter(nodes: Node[]) {
  let text = '';
  for (const node of nodes) {
    const color = colorMap[node.type];
    if (color) text += color(node.value);
    else text += node.value;
  }
  return text;
}
