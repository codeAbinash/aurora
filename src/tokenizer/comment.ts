import type { Token } from "../types";

export function multiLineComment(char: string, code: string, curr: number, tokens: Token[]) {
  let value = '';
  tokens.push({ type: 'comment_start', value: '/*' });
  curr += 1;
  while (curr < code.length && !isMultiLineCommentEnd(code, curr)) {
    value += code[curr];
    curr++;
  }
  tokens.push({ type: 'comment', value });

  if (curr < code.length) {
    tokens.push({ type: 'comment_end', value: '*/' });
    curr += 2;
  } else {
    console.warn('multi-line comment unclosed at end of file');
  }
  return { char, curr };
}

export function isMultiLineCommentEnd(code: string, curr: number) {
  return code[curr] === '*' && code[curr + 1] === '/';
}

export function singleLineComment(char: string, code: string, curr: number, tokens: Token[]) {
  let value = '';
  tokens.push({ type: 'comment_start', value: '//' });
  curr += 1; // Skip the next character
  while (curr < code.length && code[curr] !== '\n') {
    value += code[curr];
    curr++;
  }
  tokens.push({ type: 'comment', value });
  return { char, curr };
}
