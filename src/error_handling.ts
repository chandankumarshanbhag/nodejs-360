// Errors

// Errors in Node.js are handled through exceptions.

// Creating an Exception
try {
  throw new Error("Drop nuclear bombs");
} catch (e) {}

// As soon as JavaScript executes this line.
// the normal program flow is halted and the control is held back to the nearest exception handler.

// Handling an Exception
// Exception can be handled using try and catch blocks.
try {
  //lines of code
} catch (e) {}
// Any exception that is thrown in the try block is caught by the corresponding catch block.
// e will hold the error object and can be used for handling the error.

// Error objects
// Error objects can be a instance of Error class or any other class that extends Error class.

try {
  throw new Error("Drop nuclear bombs");
} catch (e) {}

class DropNuclearBombs extends Error {
  name: string = "DropNuclearBombs";
  message: string = "Drop nuclear bombs";
}

try {
  throw new DropNuclearBombs();
} catch (e) {}

// Catching uncaught exceptions
// Uncaught exceptions are exceptions that are not handled by any exception handler. and the program will crash
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});

// Exceptions with promises

async function dropNuclearBombs() {
  // Some action
  throw new DropNuclearBombs();
}

dropNuclearBombs()
  .then(() => {
    // Some action
  })
  .catch((err) => {
    console.log(`Caught error: ${err.message}`);
  });

// Using promises you can chain different operations, and handle errors at the end

// Error handling with await
async function someFunction() {
  try {
    await dropNuclearBombs();
  } catch (err: any) {
    console.log(`Caught error: ${err.message}`);
  }
}
// We can use try catch pattern to handle errors in async functions.
