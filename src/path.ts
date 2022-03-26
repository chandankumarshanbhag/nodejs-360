import path from "path";

// We can join paths together using the path.join() method.
let file = path.join(__dirname, "..","playground", "a.txt");

path.dirname(file); // "C:\Users\user\Desktop\node-course\src"
path.basename(file); // "a.txt"
path.extname(file); // ".txt"

// Mentioning the file extension in second parameter will remove extension from the file name
let fileWithoutExt = path.basename(file, path.extname(file));
console.log(fileWithoutExt); // a

// path.resolve is used to resolve the absolute path by giving relative path
path.resolve("a.txt"); // /home/niveus-22/Documents/shanbhag.dev/nodejs-apis/a.txt

// normalize creates a actual path by removing redundant slashes and dots
path.normalize('/foo/bar//baz/asdf/quux/..'); // /foo/bar/baz/asdf
