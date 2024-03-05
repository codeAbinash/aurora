/**
 * Tokenizer for C language
 * by Abinash Karmakar
 * 2023-10-22
 */

import { DEFINED, KEYWORDS } from './constants';

type TokenType =
  | 'comment_start'
  | 'comment_end'
  | 'comment'
  | 'preprocessor'
  | 'defined'
  | 'header_file'
  | 'keyword'
  | 'name'
  | 'string'
  | 'quote double'
  | 'quote single'
  | 'quote angle'
  | 'format_specifier'
  | 'number'
  | 'bin_prefix'
  | 'oct_prefix'
  | 'hex_prefix'
  | 'bin_literal'
  | 'oct_literal'
  | 'hex_literal'
  | 'function'
  | 'operator'
  | 'escape'
  | 'comma'
  | 'semicolon'
  | 'colon'
  | 'hash'
  | 'open_paren'
  | 'close_paren'
  | 'open_curly'
  | 'close_curly'
  | 'open_square'
  | 'close_square'
  | 'whitespace'
  | 'unknown'
  | 'open_paren bracket0'
  | 'open_paren bracket1'
  | 'open_paren bracket2'
  | 'close_paren bracket0'
  | 'close_paren bracket1'
  | 'close_paren bracket2'
  | 'open_curly bracket0'
  | 'open_curly bracket1'
  | 'open_curly bracket2'
  | 'close_curly bracket0'
  | 'close_curly bracket1'
  | 'close_curly bracket2'
  | 'open_square bracket0'
  | 'open_square bracket1'
  | 'open_square bracket2'
  | 'close_square bracket0'
  | 'close_square bracket1'
  | 'close_square bracket2';

export type Token = {
  type: TokenType;
  value: string;
};

const WHITESPACE = /\s/;
// const ESCAPE = /^(n|t|r|v|b|a|f|\\|\?|\'|\"|0)$/;
// const FORMAT_SPECIFIER_END = /^(d|i|u|o|x|X|f|F|e|E|g|G|c|s|%)$/;
const FORMAT_SPECIFIER_WIDTH = /^([0-9]+|\.)$/;
const OCT_DIGIT = /^[0-7]$/;
const HEX_DIGIT = /^[0-9a-f]$/i;
const BIN_DIGIT = /^[01]$/;
const NAME = /[a-z_]/i;
const DIGIT = /\d/;

export default function tokenizer(code: string) {
  let curr = 0;
  const length = code.length;
  const tokens: Token[] = [];

  let square_count = 0;
  let curly_count = 0;
  let paren_count = 0;

  while (curr < length) {
    let char = code[curr];

    if (WHITESPACE.test(char || '')) {
      let value = '';
      while (WHITESPACE.test(char)) {
        value += char;
        char = code[++curr];
      }
      tokens.push({ type: 'whitespace', value });
      continue;
    }

    // Comments
    if (char === '/') {
      char = code[++curr];
      if (char === '/') {
        ({ char, curr } = singleLineComment(char, code, curr, tokens));
        continue;
      }
      if (char === '*') {
        ({ char, curr } = multiLineComment(char, code, curr, tokens));
        continue;
      }
      tokens.push({ type: 'operator', value: '/' });
      continue;
    }

    // Strings
    if (char === '"') {
      ({ char, curr } = stringLiteral(char, code, curr, tokens, length));
      continue;
    }

    // Single quotes or character literals
    if (char === "'") {
      ({ char, curr } = characterLiteral(tokens, char, code, curr, length));
      continue;
    }

    // Numbers
    if (char >= '0' && char <= '9') {
      ({ char, curr } = numberLiteral(char, code, curr, tokens));
      continue;
    }

    // Preprocessor directives
    if (char === '#' && (curr == 0 || code[curr - 1] == '\n')) {
      ({ char, curr } = preprocessorLiteral(char, code, curr, length, tokens));
      continue;
    }

    //hash
    if (char === '#') {
      tokens.push({ type: 'hash', value: '#' });
      curr++;
      continue;
    }

    // Names
    if (NAME.test(char!)) {
      ({ char, curr } = nameLiteral(char, code, curr, tokens));
      continue;
    }

    switch (char) {
      case '{':
        tokens.push({
          type: ('open_curly bracket' + (curly_count >= 0 ? curly_count % 3 : '')) as Token['type'],
          value: '{',
        });
        curly_count++;
        break;
      case '}':
        curly_count--;
        tokens.push({
          type: ('close_curly bracket' + (curly_count >= 0 ? curly_count % 3 : '')) as Token['type'],
          value: '}',
        });
        break;
      case '(':
        tokens.push({
          type: ('open_paren bracket' + (paren_count >= 0 ? paren_count % 3 : '')) as Token['type'],
          value: '(',
        });
        paren_count++;
        break;
      case ')':
        paren_count--;
        tokens.push({
          type: ('close_paren bracket' + (paren_count >= 0 ? paren_count % 3 : '')) as Token['type'],
          value: ')',
        });
        break;
      case '[':
        tokens.push({
          type: ('open_square bracket' + (square_count >= 0 ? square_count % 3 : '')) as Token['type'],
          value: '[',
        });
        square_count++;
        break;
      case ']':
        square_count--;
        tokens.push({
          type: ('close_square bracket' + (square_count >= 0 ? square_count % 3 : '')) as Token['type'],
          value: ']',
        });
        break;
      case '+':
        tokens.push({ type: 'operator', value: '+' });
        break;
      case '-':
        tokens.push({ type: 'operator', value: '-' });
        break;
      case '*':
        tokens.push({ type: 'operator', value: '*' });
        break;
      case '/':
        tokens.push({ type: 'operator', value: '/' });
        break;
      case '%':
        tokens.push({ type: 'operator', value: '%' });
        break;
      case '=':
        tokens.push({ type: 'operator', value: '=' });
        break;
      case '&':
        tokens.push({ type: 'operator', value: '&' });
        break;
      case '|':
        tokens.push({ type: 'operator', value: '|' });
        break;
      case '^':
        tokens.push({ type: 'operator', value: '^' });
        break;
      case '~':
        tokens.push({ type: 'operator', value: '~' });
        break;
      case '!':
        tokens.push({ type: 'operator', value: '!' });
        break;
      case '<':
        tokens.push({ type: 'operator', value: '<' });
        break;
      case '>':
        tokens.push({ type: 'operator', value: '>' });
        break;
      case '?':
        tokens.push({ type: 'operator', value: '?' });
        break;
      case ':':
        tokens.push({ type: 'colon', value: ':' });
        break;
      case '.':
        tokens.push({ type: 'operator', value: '.' });
        break;
      case ',':
        tokens.push({ type: 'comma', value: ',' });
        break;
      case ';':
        tokens.push({ type: 'semicolon', value: ';' });
        break;
      default:
        console.warn('unrecognized character: ' + char);
        tokens.push({ type: 'unknown', value: char });
    }
    curr++;
  }
  return tokens;
}

function preprocessorLiteral(char: string, code: string, curr: number, length: number, tokens: Token[]) {
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

function nameLiteral(char: string, code: string, curr: number, tokens: Token[]) {
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

function numberLiteral(char: string, code: string, curr: number, tokens: Token[]) {
  // Check if the number is octal, hexadecimal or binary
  let prev_char = char;
  char = code[++curr];

  if (prev_char === '0') {
    // Check for octal, hexadecimal or binary
    if (char === 'x' || char === 'X') {
      ({ char, curr } = hexLiteral(prev_char, char, code, curr, tokens));
      return { char, curr };
    }

    if (char === 'b' || char === 'B') {
      ({ char, curr } = binLiteral(prev_char, char, code, curr, tokens));
      return { char, curr };
    }

    if (char === '.') {
      ({ char, curr } = decimalNumberLiteral(prev_char, char, code, curr, tokens));
      return { char, curr };
    }

    if (OCT_DIGIT.test(char)) {
      ({ char, curr } = octLiteral(prev_char, char, code, curr, tokens));
      return { char, curr };
    }

    ({ char, curr } = decimalNumberLiteral(prev_char, char, code, curr, tokens));
    // Decimal number starts with 0
  } else {
    // Decimal number starts with 1-9
    ({ char, curr } = decimalNumberLiteral(prev_char, char, code, curr, tokens));
  }
  return { char, curr };
}

function octLiteral(prev_char: string, char: string, code: string, curr: number, tokens: Token[]) {
  let value = '';
  tokens.push({ type: 'oct_prefix', value: prev_char });
  while (OCT_DIGIT.test(char)) {
    value += char;
    char = code[++curr];
  }
  tokens.push({ type: 'number', value });
  return { char, curr };
}

function binLiteral(prev_char: string, char: string, code: string, curr: number, tokens: Token[]) {
  let value = '';
  tokens.push({ type: 'bin_prefix', value: prev_char + char });
  char = code[++curr];
  while (BIN_DIGIT.test(char)) {
    value += char;
    char = code[++curr];
  }
  tokens.push({ type: 'number', value });
  return { char, curr };
}

function hexLiteral(prev_char: string, char: string, code: string, curr: number, tokens: Token[]) {
  let value = '';
  tokens.push({ type: 'hex_prefix', value: prev_char + char });
  char = code[++curr];
  while (HEX_DIGIT.test(char)) {
    value += char;
    char = code[++curr];
  }
  tokens.push({ type: 'number', value });
  return { char, curr };
}

function decimalNumberLiteral(prev_char: string, char: string, code: string, curr: number, tokens: Token[]) {
  let value = prev_char;
  let dots = 0;
  while (DIGIT.test(char) || (char === '.' && ++dots)) {
    value += char;
    char = code[++curr];
  }
  if (dots > 1) {
    console.warn('invalid number: ' + value);
    tokens.push({ type: 'unknown', value });
    value = '';
  }
  tokens.push({ type: 'number', value });
  return { char, curr };
}

function characterLiteral(tokens: Token[], char: string, code: string, curr: number, length: number) {
  let value = '';
  tokens.push({ type: 'quote single', value: "'" });
  char = code[++curr];
  while (char !== "'") {
    if (curr >= length) {
      console.warn('character literal unclosed at end of file');
      break;
    }
    // Check for escape sequence
    if (char == '\\') {
      // Push the previous value as string
      tokens.push({ type: 'string', value });
      ({ value, char, curr } = escapeSequence(tokens, value, char, code, curr));
      continue;
    }
    value += char;
    char = code[++curr];
  }
  tokens.push({ type: 'string', value });
  if (char !== "'") console.warn('character literal unclosed at end of file');
  else tokens.push({ type: 'quote single', value: "'" });
  curr++;
  return { char, curr };
}

function stringLiteral(char: string, code: string, curr: number, tokens: Token[], length: number) {
  let value = '';
  char = code[++curr];
  tokens.push({ type: 'quote double', value: '"' });

  while (char !== '"') {
    if (curr >= length) {
      console.warn('string unclosed at end of file');
      break;
    }
    // Check for escape sequence
    if (char == '\\') {
      tokens.push({ type: 'string', value }); // Push the previous value as string
      ({ value, char, curr } = escapeSequence(tokens, value, char, code, curr));
      continue;
    }

    // Check for format specifier
    if (char == '%') {
      tokens.push({ type: 'string', value }); // Push the previous value as string
      value = ''; // Reset the value
      tokens.push({ type: 'format_specifier', value: '%' }); // Push the '%' sign as format specifier
      let format_specifier = '';
      char = code[++curr];

      // If the next character is '[' then it is a regular expression
      // if (char == '[') {
      //   format_specifier += char;
      //   char = code[++curr];
      //   while (!(char == '"' || char == ']')) {
      //     if (curr >= length) break;
      //     format_specifier += char;
      //     char = code[++curr];
      //   }
      //   if (char == '"') {
      //     curr -= format_specifier.length;
      //     // Remove the last character from value
      //     format_specifier = '%';
      //   }
      //   if (char !== '"') format_specifier += char;
      //   tokens.push({ type: 'c_regex', value: format_specifier });
      //   value = '';
      //   char = code[++curr];
      //   continue;
      // }
      // Continue until the end of format specifier
      let dots = 0;
      while (FORMAT_SPECIFIER_WIDTH.test(char)) {
        // If number of dots is more than 1 then it is not a format specifier
        if (char == '.') dots++;
        format_specifier += char;
        char = code[++curr];
      }

      if (dots > 1) {
        // It is not a format specifier
        value += format_specifier;
        tokens.push({ type: 'string', value });
        continue;
      }

      if (format_specifier.length >= 1) {
        tokens.push({ type: 'format_specifier', value: format_specifier });
        format_specifier = '';
      }

      const c1 = char,
        c2 = code[curr + 1],
        c3 = code[curr + 2];

      switch (c1) {
        case 'l':
          switch (c2) {
            case 'l':
              if (isCommonFormatSpecifier(c3, true)) formatSpecifier3(format_specifier);
              break;
            default:
              if (isCommonFormatSpecifier(c2, false)) formatSpecifier2(format_specifier);
              break;
          }
          break;
        case 'L':
          if (isCommonFormatSpecifier(c2, false)) formatSpecifier2(format_specifier);
          break;
        case 'h':
          switch (c2) {
            case 'h':
              if (isCommonFormatSpecifier(c3, false)) formatSpecifier3(format_specifier);
              break;
            default:
              if (isCommonFormatSpecifier(c2, false)) formatSpecifier2(format_specifier);
              break;
          }
          break;
        case 'j':
          switch (c2) {
            case 'j':
              if (isCommonFormatSpecifier(c3)) formatSpecifier3(format_specifier);
              break;
            default:
              if (isCommonFormatSpecifier(c2, false)) formatSpecifier2(format_specifier);
              break;
          }
          break;
        case 'z':
          switch (c2) {
            case 'z':
              if (isCommonFormatSpecifier(c3)) formatSpecifier3(format_specifier);
              break;
            default:
              if (isCommonFormatSpecifier(c2, false)) formatSpecifier2(format_specifier);
              break;
          }
          break;
        case 't':
          switch (c2) {
            case 't':
              if (isCommonFormatSpecifier(c3)) formatSpecifier3(format_specifier);
              break;
            default:
              if (isCommonFormatSpecifier(c2, false)) formatSpecifier2(format_specifier);
              break;
          }
          break;
        default:
          if (isSingleFormatSpecifier(c1)) formatSpecifier1(format_specifier);
          break;
      }

      tokens.push({ type: 'string', value: format_specifier });
      value = '';
      continue;
    }

    value += char;
    char = code[++curr];
  }
  tokens.push({ type: 'string', value });
  if (char !== '"') console.warn('string unclosed at end of file');
  else tokens.push({ type: 'quote double', value: '"' });
  curr++;
  return { char, curr };

  function formatSpecifier3(format_specifier: string) {
    format_specifier += char + code[curr + 1] + code[curr + 2];
    curr += 3;
    char = code[curr];
    tokens.push({ type: 'format_specifier', value: format_specifier });
  }
  function formatSpecifier2(format_specifier: string) {
    format_specifier += char + code[curr + 1];
    curr += 2;
    char = code[curr];
    tokens.push({ type: 'format_specifier', value: format_specifier });
  }
  function formatSpecifier1(format_specifier: string) {
    format_specifier += char;
    curr++;
    char = code[curr];
    tokens.push({ type: 'format_specifier', value: format_specifier });
  }
}

function multiLineComment(char: string, code: string, curr: number, tokens: Token[]) {
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

function isMultiLineCommentEnd(code: string, curr: number) {
  return code[curr] === '*' && code[curr + 1] === '/';
}

function singleLineComment(char: string, code: string, curr: number, tokens: Token[]) {
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

function escapeSequence(tokens: Token[], value: string, char: string, code: string, curr: number) {
  value = '';
  let escape = char;
  const next = code[curr + 1];
  if (isEscapeSequence(next)) {
    escape += next;
    curr++;
  } else {
    console.warn('unknown escape sequence:', escape + next);
  }
  tokens.push({ type: 'escape', value: escape });
  curr++;
  char = code[curr];
  return { value, char, curr };
}

function isEscapeSequence(char: string) {
  return (
    char === "'" ||
    char === '"' ||
    char === '0' ||
    char === '?' ||
    char === '\\' ||
    char === 'a' ||
    char === 'b' ||
    char === 'f' ||
    char === 'n' ||
    char === 'r' ||
    char === 't' ||
    char === 'v'
  );
}

function isCommonFormatSpecifier(ch: string, sensitive = true) {
  ch = sensitive ? ch : ch.toLowerCase();
  return (
    ch === 'a' ||
    ch === 'c' ||
    ch === 'd' ||
    ch === 'e' ||
    ch === 'f' ||
    ch === 'g' ||
    ch === 'i' ||
    ch === 'n' ||
    ch === 'o' ||
    ch === 'p' ||
    ch === 's' ||
    ch === 'u' ||
    ch === 'x'
  );
}

function isSingleFormatSpecifier(ch: string) {
  return (
    ch === 'd' ||
    ch === 'i' ||
    ch === 'u' ||
    ch === 'o' ||
    ch === 'x' ||
    ch === 'X' ||
    ch === 'f' ||
    ch === 'F' ||
    ch === 'e' ||
    ch === 'E' ||
    ch === 'g' ||
    ch === 'G' ||
    ch === 'c' ||
    ch === 's' ||
    ch === 'p' ||
    ch === 'n' ||
    ch === '%'
  );
}
