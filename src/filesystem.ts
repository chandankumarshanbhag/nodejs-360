import fs, { fdatasync } from "fs";
import path from "path";

let playground = path.join(__dirname, "..", "playground");
let file = path.join(playground, "a.txt");

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
fs.appendFile(file, content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  // Append successful
});

// Rename a file
// fs.rename(path.join(playground, "rename1.txt"), path.join(playground, "renamed2.txt"), (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   // Rename successful
// });

// fs.renameSync(
//   path.join(playground, "rename2.txt"),
//   path.join(playground, "renamed2.txt")
// );

// Cons:
// After writing all the contents in file. control goes back the main program
// When a file is read all the contents are stored in primary memory(RAM). This is not recommended for large files.
// Instead use Streams.

// Folders

// Create a folder
fs.mkdir(path.join(playground, "folder"), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  // Folder created successfully
});

// Create a folder synchronously
// Remember to handle error cases. throw error if folder already exists or for any other reason.
try {
  fs.mkdirSync(path.join(playground, "folder"));
} catch (err) {
  console.error(err);
}

// Create a folder recursively
fs.mkdir(
  path.join(playground, "folder", "subfolder"),
  { recursive: true },
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    // Folder created successfully
  }
);

// Check folder or file exists and node has enough permission to access it.
fs.access(playground, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  // Has access to the folder
});

try {
  fs.accessSync(playground, fs.constants.R_OK);
  // Has read access to the folder
} catch (err) {}

// Check folder or file exists
fs.exists(file, (exists) => {
  if (exists) {
    // File exists
  } else {
    // File does not exist
  }
});

let exists: boolean = fs.existsSync(playground);
console.log(`Folder exists: ${exists}`);

// Reading contents of a directory
// Gives relative path of all the files and subfolders in a directory.
fs.readdir(playground, (err, contents: string[]) => {
  if (err) {
    // Read failed
  } else {
    console.log(contents);
  }
});

try {
  let contents: string[] = fs.readdirSync(playground);
  console.log(contents);
} catch (err) {
  console.error("Failed to read");
}

// Example1: Read all files in a directory
let allFiles: string[] = fs
  .readdirSync(playground)
  .filter((file) => fs.statSync(path.join(playground, file)).isFile());
console.log(`All files in playground: ${allFiles}`);

// Remove a folder
fs.rmdir(path.join(playground, "folder", "subfolder"), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  // Folder removed successfully
});

try {
  fs.rmSync(path.join(playground, "folder"));
  // Folder removed successfully
} catch (err) {
  // Error removing folder
}
