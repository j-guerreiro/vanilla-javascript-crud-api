module.exports = (req, res) => {

  let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  console.log(baseURL);
  let id = req.url.split("/")[3];

  const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

  // URL route check fetching all movies at once.
  if (req.url === "/api/movies/") {
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();

  // Movie UUID validation through regex.
  } else if (!regexV4.test(id)) {
    console.log("Invalid UUID");
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify({ title: "Validation failed", message: "Invalid UUID" }));

  // Movie UUID and url check.
  } else if (baseURL === "/api/movies/" && regexV4.test(id)) {
    res.statusCode = 200;
    res.setHeader = ("Content-type", "application/json");

    // Single movie filter.
    let filteredMovie = req.movies.filter(movie => {
      return movie.id === id;
    });

    // Check if the movie ID exists and fetch it.
    if (filteredMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovie));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify({ title: "Not found", message: "Movie not found" }));
      res.end();
    }

  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found" }));
  }
};