const fs = require("fs");
const path = require("path");
const local = path.resolve(__dirname, "..", "..", "tmp", "answer.json");

module.exports = function readFile() {
  fs.readFile(local, (err, data) => {
    if (err) {
      throw err;
    } else {
      let datas = JSON.parse(data);
      console.log(datas);
      return datas;
    }
  });
};
