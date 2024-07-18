import type { Token } from '../types';

export default function preprocessorLiteral(char: string, code: string, curr: number, length: number, tokens: Token[]) {
  let value = char;
  char = code[++curr];

  while (char !== ' ' && char !== '\n' && char !== '\t' && char !== '\r' && char !== '"' && char !== '<') {
    if (curr >= length) break;
    value += char;
    char = code[++curr];
  }

  tokens.push({ type: 'preprocessor', value });
  // If the value is 'include' then it is a header file
  if (value === '#include') {
    ({ char, curr } = headerFileLiteral(char, code, curr, tokens));
  }
  // If the next character is '<' or '"' then it is a header file
  return { char, curr };
}

function headerFileLiteral(char: string, code: string, curr: number, tokens: Token[]) {
  let value = '';
  while (char !== '"' && char !== '<') {
    value += char;
    char = code[++curr];
  }
  tokens.push({ type: 'whitespace', value });

  value = '';
  // tokens.push({ type: 'quote double', value: '"' });

  if (char === '"') {
    tokens.push({ type: 'quote double', value: '"' });
    char = code[++curr];
    while (char !== '"') {
      if (curr >= code.length) {
        console.warn('header file unclosed at end of file');
        break;
      }
      if (curr >= code.length) break;
      value += char;
      char = code[++curr];
    }
    curr++;
    tokens.push({ type: 'header_file', value });
    tokens.push({ type: 'quote double', value: '"' });
    return { char, curr };
  }

  if (char === '<') {
    tokens.push({ type: 'quote angle', value: '<' });
    char = code[++curr];
    while (char !== '>') {
      if (curr >= code.length) {
        console.warn('header file unclosed at end of file');
        break;
      }
      if (curr >= code.length) break;
      value += char;
      char = code[++curr];
    }
    // headerFile += char == '>' ? '&gt' : char;
    curr++;
    tokens.push({ type: 'header_file', value });
    tokens.push({ type: 'quote angle', value: '>' });
    return { char, curr };
  }

  return { char, curr };
}
