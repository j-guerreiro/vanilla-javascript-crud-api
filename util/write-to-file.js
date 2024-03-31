const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  console.log("The data to write into the file", data);
  try {
    fs.writeFileSync(
       /* 
       directory path
       two levels up
       folder name
       the file that will be updated
       */ 
      path.join(__dirname,"..", "data", "movies.json"),
      JSON.stringify(data),
      "utf-8"
    )
  } catch (err) {
    console.log(err);
  }
}