/**
 * Aurora: The C code highlighting engine
 * Author: Abinash Karmakar (codeAbinash)
 * 2023-10-26
 */

#include <stdio.h>  // Header File Highlighting Supported

#include "string.h"

void sayHello(int n) {
   long long int num = (10 + 20 * (3 / 4 + (2 * -7)));
   // Bracket Pair Highlighting Supported
   void *p = NULL;
   float f = 10;
   for (size_t i = 0; i < n; i++, f += 0.1) {
      // Format Specifier and Escape Sequence
      printf("Hello World! \t %d - %2.2f \n", i, f);
      // Complex String Highlighting Supported
   }
}

int main() {
   int arr[] = {1, 2, 3, 4};     // Array Literal
   int *ptr = arr;               // Pointers
   int bin = 0b10101;            // Binary Number supported
   int oct = 0123215;            // Octal Number supported
   int hex = 0x1A2BD;            // Hexadecimal Number supported
   char c = 'a';                 // Character supported
   char str[] = "Hello World!";  // String supported

   sayHello(10);  // Function Highlighting Supported

   printf("Aurora is the best!\n");
   return 0;
}
