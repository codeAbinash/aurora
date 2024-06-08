import type { Token } from "./types";

export type Node = {
  type: string;
  value: string;
};

export default function nodeGenerator(tokens: Token[]) {
  const nodes: Node[] = [];

  // For Bracket pair colorizer
  let square_count = 0;
  let curly_count = 0;
  let paren_count = 0;

  tokens.forEach((token) => {
    switch (token.type) {
      case 'open_paren':
        paren_count >= 0 && (token.type += ' bracket' + (paren_count % 3));
        paren_count++;
        break;
      case 'close_paren':
        paren_count--;
        paren_count >= 0 && (token.type += ' bracket' + (paren_count % 3));
        break;
      case 'open_curly':
        curly_count >= 0 && (token.type += ' bracket' + (curly_count % 3));
        curly_count++;
        break;
      case 'close_curly':
        curly_count--;
        curly_count >= 0 && (token.type += ' bracket' + (curly_count % 3));
        break;
      case 'open_square':
        square_count >= 0 && (token.type += ' bracket' + (square_count % 3));
        square_count++;
        break;
      case 'close_square':
        square_count--;
        square_count >= 0 && (token.type += ' bracket' + (square_count % 3));
        break;
      // case 'quote':
      // token.type += ' ' + token.subtype;
      // break;
      default:
        break;
    }
    nodes.push(token);
  });
  return nodes;
}
