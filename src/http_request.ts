import { request, RequestOptions } from "https";

const options = <RequestOptions>{
  hostname: "https://api.github.com",
    // port: 80,
//   path: "/",
  method: "GET",
};

const req = request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
