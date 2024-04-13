const writeToFile = require("../util/write-to-file");

module.exports = (req, res) => {

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
      // If movie is found

      /**
       * The splice() method is used to add or remove elements of an existing array and 
       * the return value will be the removed items from the array. 
       * If nothing was removed from the array, 
       * then the return value will just be an empty array. 
       */
      req.movies.splice(index, 1); // movie index and delete operation(1)
      writeToFile(req.movies);
      res.writeHead(204, { "Content-type": "application/json" } );
      res.end(JSON.stringify(req.movies));
    }
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found" }));
  }
};