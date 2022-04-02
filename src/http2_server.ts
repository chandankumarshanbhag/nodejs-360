import http2, { Http2Stream } from "http2";
import fs from "fs";
import path from "path";

// use http2 module to create a server
// browsers doesn't supports unencrypted HTTP/2. So we need to use https protocol with HTTP/2
// to create https server we need to pass private key and certificate
// private key and certificate can be created using openSSL CLI
// use the below command to create private key and certificate
// openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
let server = http2.createSecureServer({
  key: fs.readFileSync(path.join(__dirname, "..", "localhost-privkey.pem")),
  cert: fs.readFileSync(path.join(__dirname, "..", "localhost-cert.pem")),
});

server.on("error", (err) => console.error(err));

// this stream instance is Duplex(Readable and Writable) 
server.on("stream", (stream, headers) => {
  switch (headers[":path"]) {
    case "/api":
      stream.respond({
        "content-type": "application/json",
        ":status": 200,
      });
      stream.end(JSON.stringify({ name: "John", age: 30 }, null, 2));
      break;
    case "/":
    default:
      stream.respond({
        "content-type": "text/html; charset=utf-8",
        ":status": 200,
      });
      stream.end("<h1>Hello World</h1>");
  }
});

// Open https://[host]:8443
server.listen(8443);
