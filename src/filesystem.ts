import fs, { fdatasync } from "fs";
import path from "path";

let file = path.join(__dirname, "..", "a.txt");

// File Descriptor
// A file descriptor is unique number given by the OS whenever a file is opened.
// File can be opened in different modes (read, write, append, etc.) these are called flags
// r - read
// w - write
// a - open the file for writing, positioning the stream at the end of the file. The file is created if not existing.
// r+ - open the file for reading and writing, if file doesn't exist it won't be created.
// w+ - open the file for reading and writing, positioning the stream at the beginning of the file. The file is created if not existing.
// a+ - open the file for reading and writing, positioning the stream at the end of the file. The file is created if not existing.
fs.open(file, "r", (err, fd) => {
  if (err) {
    console.error(err);
  } else {
    console.log(fd.toString());
  }
});

try {
  let fd = fs.openSync(file, "r");
} catch (err) {
  console.error(err);
}

// File Stats
// File details
fs.stat(file, (err, stats: fs.Stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats);
  }
});

let fileStats: fs.Stats = fs.statSync(file);
console.log(fileStats);

// File stats also includes other information like:
// isFile() - returns true if the file is a file
// isDirectory() - returns true if the file is a directory
// isSymbolicLink() - returns true if the file is a symbolic link
// size - returns the size of the file in bytes

fileStats.isFile(); //true
fileStats.isDirectory(); //false
fileStats.isSymbolicLink(); //false
fileStats.size; //1024000 //= 1MB

// Reading a file
// Read the full contents of the file in memory. All the contents are stored in primary memory while executing the code.
// This is not recommended for large files. Instead use Streams.
fs.readFile(file, "utf8", (err, data: string) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

// Read the file synchronously
let data: string = fs.readFileSync(file, "utf8");
console.log(data);

// Writing a file

let content: string = "Hello world from filesystem";
// Write the contents of a string to a file.
fs.writeFile(file, content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //file written successfully
});

// Write the contents of a string to a file synchronously
try {
  fs.writeFileSync(file, content);
  // file written successfully
} catch (err) {}

// By default this API replaces the file if it already exists.
// We can override this behavior using flags. supports all flags.
fs.writeFile(file, content, { flag: "a+" }, (err) => {});


// Append to a file
// Append the contents of a string to a file.
fs.appendFile(file, content, err => {
  if (err) {
    console.error(err)
    return
  }
  // Append successful
})


// Cons: 
// After writing all the contents in file. control goes back the main program
// When a file is read all the contents are stored in primary memory(RAM). This is not recommended for large files.
// Instead use Streams.