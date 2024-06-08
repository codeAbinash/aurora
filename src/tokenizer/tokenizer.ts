/**
 * Tokenizer for C language
 * by Abinash Karmakar
 * 2023-10-22
 */

import { NAME, WHITESPACE } from '../regex';
import type { Token } from '../types';
import { multiLineComment, singleLineComment } from './comment';
import nameLiteral from './name';
import numberLiteral from './number';
import preprocessorLiteral from './preprocessor';
import stringLiteral, { characterLiteral } from './string';

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
