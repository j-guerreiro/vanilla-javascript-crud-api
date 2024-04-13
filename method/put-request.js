// Body parser utility
const bodyParser = require("../util/body-parser");
const requestBodyParser = require("../util/body-parser");
// Write to file utility
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res) => {
  let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  console.log(baseURL);
  let id = req.url.split("/")[3];

  const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

  if (!regexV4.test(id)) {
    console.log("Invalid UUID");
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "Invalid UUID"
      }));
  } else if (baseURL === "/api/movies/" && regexV4.test(id)) {

    try {
      let body = await bodyParser(req);

      // Check movie index.
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      })

      // If movie is not found.
      if (index === -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not found", message: "Movie not found" }));
        res.end();
      } else {
        req.movies[index] = { id, ...body };
        writeToFile(req.movies);
        res.writeHead(400, { "Content-type": "Application/json" });
        res.end(JSON.stringify(req.movies[index]));
      }

    } catch (error) {
      console.log("Invalid request");
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is not valid!"
        })
      );
    }
  }
};