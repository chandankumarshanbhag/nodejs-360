import http from "http";

const port = process.env.PORT || 3000;

// Create a server. Callback is called whenever there is incoming request
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Welcome to homepage</h1>");
      break;
    case "/about":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Welcome to about page</h1>");
      break;
      case "/api":
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(`
            {
                "name": "John",
                "age": 30
            }
        `);
        break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Page not found</h1>");
  }
});

// Listen to port
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
