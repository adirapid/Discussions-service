const getPow   = require("./getPow");
const getHello = require("./getHello");

module.exports = function (app) {
  app.get("/pow/:num", getPow);
  app.get("/hello", getHello);
};
