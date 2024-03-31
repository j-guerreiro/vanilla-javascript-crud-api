const crypto = require("crypto");
// Body parser utility
const requestBodyParser = require("../util/body-parser");

// Write to file utility
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res) => {
  if (req.url === '/api/movies/') {
    try {
      let body = await requestBodyParser(req);

      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-type": "application/json" });
      res.end();
    } catch (err) {
      console.log(err);

      res.writeHead(400, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({ title: "Validation failed", message: "Request body is not valid!" })
      );
    }
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found" }));
  }
};