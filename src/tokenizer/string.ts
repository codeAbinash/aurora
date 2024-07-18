import { FORMAT_SPECIFIER_WIDTH } from '../regex';
import type { Token } from '../types';
import { escapeSequence, isCommonFormatSpecifier, isSingleFormatSpecifier } from './format_specifier';

export function characterLiteral(tokens: Token[], char: string, code: string, curr: number, length: number) {
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

export default function stringLiteral(char: string, code: string, curr: number, tokens: Token[], length: number) {
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
