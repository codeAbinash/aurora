import type { Token } from '../types';

export function escapeSequence(tokens: Token[], value: string, char: string, code: string, curr: number) {
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

export function isEscapeSequence(char: string) {
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
  
export function isCommonFormatSpecifier(ch: string, sensitive = true) {
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

export function isSingleFormatSpecifier(ch: string) {
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
