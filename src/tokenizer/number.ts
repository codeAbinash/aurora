import { OCT_DIGIT, BIN_DIGIT, HEX_DIGIT, DIGIT } from '../regex';
import type { Token } from '../types';

export default function numberLiteral(char: string, code: string, curr: number, tokens: Token[]) {
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
