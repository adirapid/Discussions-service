const fs        = require("fs");

const database  = {};

function getDatabase() {
  fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
    .forEach((file) => {
      database[file.split(".")[0]] = require(`${__dirname}/${file}`); // eslint-disable-line import/no-dynamic-require, global-require
    });
  return database;
}

module.exports = getDatabase();
