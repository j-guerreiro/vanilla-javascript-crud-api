/**
 * Tut for this code can be found here:
 * https://www.youtube.com/watch?v=4Z02Lgx4nS0
 */

const getReq = require("./method/get-request");
const postReq = require("./method/post-request");
const putReq = require("./method/put-request");
const deleteReq = require("./method/delete-request");
let movies = require("./data/movies.json");

const http = require("http");
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {

  req.movies = movies;

  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;

    case "POST":
      postReq(req, res);
      break;

    case "PUT":
      putReq(req, res);
      break;

    case "DELETE":
      deleteReq(req, res);
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-type", "application/json");
      res.write(JSON.stringify({ title: "Not found!", message: "Route not found!"}));
      res.end();
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
