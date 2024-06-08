import { KEYWORDS, DEFINED } from '../constants';
import type { Token, TokenType } from '../types';

export default function nameLiteral(char: string, code: string, curr: number, tokens: Token[]) {
  let value = '';
  while (/[a-zA-Z0-9_]/.test(char || '')) {
    value += char;
    char = code[++curr];
  }

  let extraWhitespace = ''; // Extra whitespace after the name
  while (char === ' ') {
    extraWhitespace += char;
    char = code[++curr];
  }

  let type: TokenType = 'name';
  if (char === '(') {
    type = 'function';
  } else if (KEYWORDS.includes(value)) {
    type = 'keyword';
  } else if (DEFINED.includes(value)) {
    type = 'defined';
  }

  tokens.push({ type, value });
  tokens.push({ type: 'whitespace', value: extraWhitespace });

  return { char, curr };
}
