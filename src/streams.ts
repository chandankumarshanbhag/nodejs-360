import stream from "stream";
import fs, { ReadStream } from "fs";
import path from "path";

let file = path.join(__dirname, "..", "playground", "a.txt");

// Streams
// They are data-handling method and are used to read or write input into output sequentially.
// Streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.

// NOTE: Streams are not a concept unique to Node.js. They were introduced in the Unix operating system decades ago, and programs can interact with each other passing streams through the pipe operator (|).

// Streams are very powerful when working with large amounts of data
// Using streams to process smaller chunks of data, makes it possible to read larger files.

// 4 types of streams
// Writable streams: streams to which we can write data.
// Readable streams: streams from which data can be read.
// Duplex streams: streams that are both Readable and Writable. Ex: net.Socket
// Transform streams: streams that can modify or transform the data as it is written and read. Ex: we can read and write compressed file without decompressing the file.

// Create a readable stream
let readableStream: stream.Readable = new stream.Readable({
  read() {},
});

// Create a writable stream
const writableStream = new stream.Writable({
  write(chunk, encoding, next) {
    console.log(chunk.toString());
    next();
  },
});
// pipe the readable stream to the writable stream
readableStream.pipe(writableStream);
// Now that the stream is initialized, we can send data to it:
readableStream.push("it's a beautiful day");
readableStream.push("Sun mar 27 2022 23:18");

// we can consume the readable stream by events. readable,ready,data,end,error,open,close,pause,resume
readableStream.on("readable", () => {
  console.log(readableStream.read()); // Buffer is printed
});

// Signaling a writable stream that you ended writing
// when the readable stream has closed. close the writable stream
readableStream.on("close", () => {
  console.log("Readable stream closed");
  writableStream.end();
});
readableStream.destroy(); // this will close the readable stream

// Transform stream
// Implement the transform method to modify the data.
const transformStream = new stream.Transform({
    transform(chunk, encoding, next) {
        this.push(chunk.toString().toUpperCase());
    }
});


// Working with iterators
// The readable stream is an iterator, which means it can be used in for..of loops.
const readable = fs.createReadStream(file, { encoding: "utf8" });
// since we have to await we'll move this for loop inside async function
async function logChunks(readable: ReadStream) {
  for await (const chunk of readable) {
    console.log(chunk);
  }
}
logChunks(readable);
