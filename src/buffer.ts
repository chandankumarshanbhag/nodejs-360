import { Buffer } from "buffer";

// Buffer
// A buffer is an area of memory
// It represent a fixed size memory outside v8.
// This can be compared with Pointers in programming languages like C, C++

// Buffering has nothing to do with buffering of data such as video buffering

// Creating a buffer. we can pass string, array, buffer to from factory method
// By default string are UTF-8 encoded in buffer
const buffer = Buffer.from("Hello world");

// buffer is a array of bytes. and it can be used like arrays.
console.log(buffer[0]); // 72
console.log(buffer[1]); // 101
console.log(buffer[2]); // 108
// Here 72, 101, 108 are the UTF-8 bytes of the string "Hello world"

// We can print full content using toString()
console.log(buffer.toString())

// Can access the length of the buffer using length property
console.log(buffer.length); // 11

// Buffer can be modified with write method
buffer.write("Hello world !!!");

// Creating a fixed size buffer
const buffer1 = Buffer.alloc(1024);
const buffer2 = Buffer.allocUnsafe(1024);

// in this example each buffer is allocated with 1KB memory
// alloc will allocate memory with 0s
// allocUnsafe will allocate memory without initializing. This segment of memory may contain old sensitive data.
// allocUnsafe is faster because it's uninitialized.


// Buffer can be copied to another buffer with set method
const buf = Buffer.alloc(buffer.length);
buf.copy(buffer);




