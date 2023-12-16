/**
 * Aurora ✨: The C code highlighting engine
 * Author 🧑🏻‍💻: Abinash Karmakar (codeAbinash)
 * Lightweight ✨ - 3kB only (gzipped) 🎉
 * Blazing fast ⚡ - 1000 lines in 5ms 🚀
 * 2023-10-26 📅
 */
(((((()))))))))))))))))
[[[[[[[]]]]]]]]]]]]]]]]]]
{{{{{{{}}}}}}}}}}}}}}}}}}
// Try typing some C code in the textarea there 👉🏻

// 1. Header File Highlighting
#include <stdio.h>

// 2. User Defined Header File Highlighting
#include "../include/myheader.h"

// 3. Function Definition Highlighting
void sayHello(int n) {
   float f = 10;
   for (size_t i = 0; i < n; i++, f += 0.1) {
      printf("Hello World! \t %d - %2.2f \n", i, f);
   }
}

// 4. Function Call Highlighting
sayHello(10);

// 5. Keyword Highlighting
long long int num = 1234;

// 6. Most used macros Highlighting
void* p = NULL;

// 7. Bracket Pair Highlighting
int num = (-30 + (10 + 20 * (3 / 4 + 10 * (20 + 30))));

// 8. Data Type Highlighting
float f = 10.0;
float f = 10.0f;
float f = 10.0F;

int x = 10;
int x = 0b10101;                   // Binary Number
int x = 0123215;                   // Octal Number
int x = 0x1A2BD;                   // Hexadecimal Number
int x = 10u;                       // Unsigned Integer
int x = 10U;                       // Unsigned Integer
long int x = 10l;                  // Long Integer
long int x = 10L;                  // Long Integer
long long int x = 10ll;            // Long Long Integer
long long int x = 10LL;            // Long Long Integer
unsigned long long int x = 10ull;  // Unsigned Long Long Integer
unsigned long long int x = 10ULL;  // Unsigned Long Long Integer

char c = 'a';   // Character
char c = '\n';  // Escape Sequence

char str[] = "Hello World!";        // String
char str[] = "Hello \"World!\"";    // Escape Sequence
char str[] = "Hello \n \t World!";  // Escape Sequence

char str[] = "Hello %s!";            // Format Specifier
char str[] = "The number is %d";     // Format Specifier
char str[] = "The number is %2.2f";  // Complex Format Specifier
char str[] = "The number is %x";     // Format Specifier

/**
 * It is highly customizable. You can customize it as you want.
 * You can change the color of the keywords, macros, data types, etc.
 * You can change the color of each and every token. ✨
 * See the documentation for more details. 📖
 */

// ❌ Cannot highlight macros in different color other than names
#define PI 3.14159265358979323846
/*
 The reason behind this is that, macros may be defined beyond
 the scope of the file. So, it is not possible to highlight,
 though most used macros are highlighted. E.g. NULL, EOF
*/

// ❌ Cannot highlight user defined data types
struct Person {
   char name[20];
   int age;
   float salary;
};
/*
  The reason behind this is that, Some of the user defined
  data types may have scope which is complex to handle for
  this light weight  highlighting engine. Otherwise,
  it will make the engine heavy weight. So, it is not possible
  to highlight user defined data types.
*/

/*


     ▄▄▄       █    ██  ██▀███   ▒█████   ██▀███   ▄▄▄
    ▒████▄     ██  ▓██▒▓██ ▒ ██▒▒██▒  ██▒▓██ ▒ ██▒▒████▄
    ▒██  ▀█▄  ▓██  ▒██░▓██ ░▄█ ▒▒██░  ██▒▓██ ░▄█ ▒▒██  ▀█▄
    ░██▄▄▄▄██ ▓▓█  ░██░▒██▀▀█▄  ▒██   ██░▒██▀▀█▄  ░██▄▄▄▄██
     ▓█   ▓██▒▒▒█████▓ ░██▓ ▒██▒░ ████▓▒░░██▓ ▒██▒ ▓█   ▓██▒
     ▒▒   ▓▒█░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░
      ▒   ▒▒ ░░░▒░ ░ ░   ░▒ ░ ▒░  ░ ▒ ▒░   ░▒ ░ ▒░  ▒   ▒▒ ░
      ░   ▒    ░░░ ░ ░   ░░   ░ ░ ░ ░ ▒    ░░   ░   ░   ▒
          ░  ░   ░        ░         ░ ░     ░           ░  ░

*/

/**
 * Library for a vector data structure.
 * Author : Abinash Karmakar
 * 2023-09-01 MIT License Version: 1.0
 */

#include "../../Algorithms/algorithms.h"
#include "assert.h"
#include "malloc.h"
#include "vector.h"

vector vec_init_with_destroyer(size_t size, size_t element_size, void (*destroyer)(void*)) {
   assert(size >= 0 && "Size must be non negative");
   assert(element_size > 0 && "Element size must be positive");
   vector vec;    // Creating a vector.
   vec.size = 0;  // Setting the size to 0
   vec.element_size = element_size;
   vec.capacity = size;
   if (size > 0)
      vec.data = malloc(size * element_size);
   else
      vec.data = NULL;
   vec.destroyer = destroyer;
   return vec;
}

/**
 * @brief Function to get the void pointer to the element at the given index.
 * @param vec The vector.
 * @param index The index of the element.
 * @return A void pointer to the element at the given index.
 * Time complexity: O(1)
 * @note If the index is negative, then the index is calculated from the end of the vector.
 * @note If the index is out of bounds, then the program is aborted.
 */
void* vec_at(vector* vec, int index) {
   if (index >= 0) {
      // If out of bounds
      assert(index < vec->size && "Index out of bounds");
      return vec->data + index * vec->element_size;
   } else {
      // if too much negative
      assert(index >= -vec->size && "Index out of bounds");
      return vec->data + (vec->size + index) * vec->element_size;
   }
}

/**
 * @brief Function to destroy the vector in the range [start, end).
 * @param vec The vector.
 * @param start The start pointer.
 * @param end The end pointer.
 * Time complexity: O(n)
 * @note This function is used internally by the library.
 */
void __vec_destroy_rng(vector* vec, void* start, void* end) {
   // Destroying in the range [start, end) of the vector. but not freeing the vector.
   void* pos = start;
   if (vec->destroyer != NULL) {
      while (pos != end) {
         vec->destroyer(pos);
         pos += vec->element_size;
      }
   }
}

"%LE"
