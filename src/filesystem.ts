import fs from "fs";
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



