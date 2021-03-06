// const newrelic = require("newrelic"); // eslint-disable-line
const config      = require("config");
const Express     = require("express");
const bodyParser  =  require("body-parser");
const fs          = require("fs");
const logger      = require("./utils/logger");

const app      = new Express();
const port     = process.env.PORT || config.get("DefaultPort");

app.use(bodyParser.json(({ limit: "50mb" })));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

global.logger = logger;

app.get("/ping", (req, res) => {
  res.status(200).send({ payload: "pong" });
});

fs.readdirSync("./modules")
  .filter(file => (file.indexOf(".") !== 0))
  .forEach((file) => {
    require(`./modules/${file}/${file}.routes.js`)(app); // eslint-disable-line
  });

app.listen(port, (error) => {
  if (error) {
    logger.error("Error");
  } else {
    logger.info(`[${config.get("ServiceName")}] - Running on port ${port}`);
  }
});

module.exports = app;
