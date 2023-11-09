import tokenizer from './tokenizer.js';
import nodeGenerator from './node_generator.js';
import classHighlighter, { inlineHighlighter } from './highlighter.js';
import { one_dark_pro } from './constants.js';

export type AuroraConfig =
  | {
      mode: 'inline';
      styles?: { [key: string]: string };
    }
  | {
      mode: 'class';
    };

const defaultConfig: AuroraConfig = {
  mode: 'class',
};

export default function aurora(code: string, config = defaultConfig) {
  const tokens = tokenizer(code);
  const nodes = nodeGenerator(tokens);
  let highlighted = '';
  if (config.mode === 'class') {
    highlighted = classHighlighter(nodes);
  } else {
    highlighted = inlineHighlighter(nodes, config.styles || one_dark_pro);
  }
  return highlighted;
}

export { tokenizer, nodeGenerator, classHighlighter, inlineHighlighter, one_dark_pro };
