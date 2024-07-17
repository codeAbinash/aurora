import { one_dark_pro } from './constants.js';
import classHighlighter, { inlineHighlighter } from './highlighter.js';
import nodeGenerator, { Node } from './node_generator.js';
import tokenizer from './tokenizer/tokenizer.js';
import { Token, TokenType } from './types.js';

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
  // const nodes = nodeGenerator(tokens);
  let highlighted = '';
  if (config.mode === 'class') {
    highlighted = classHighlighter(tokens);
  } else {
    highlighted = inlineHighlighter(tokens, config.styles || one_dark_pro);
  }
  return highlighted;
}

export { classHighlighter, inlineHighlighter, nodeGenerator, one_dark_pro, tokenizer };
export type { Token, TokenType, Node };
