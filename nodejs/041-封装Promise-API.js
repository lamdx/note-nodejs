var fs = require("fs");

var pReadFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, "utf8", function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

pReadFile("./public/data/a.txt")
  .then(function(data) {
    console.log(data);
    return pReadFile("./public/data/b.txt");
  })
  .then(function(data) {
    console.log(data);
    return pReadFile("./public/data/c.txt");
  })
  .then(function(data) {
    console.log(data);
  });
