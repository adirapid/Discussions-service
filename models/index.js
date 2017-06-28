const fs        = require("fs");
const Sequelize = require("sequelize");
const logger    = require("../utils/logger");

const db        = {};
const sequelize = new Sequelize(
  "discussions_schema",
  null,
  null,
  {
    port: 32780,
    dialect: "mysql",
    logging: false,
    replication: {
      write: {
        host: "192.168.99.100",
        username: "root",
        password: "wsxzaqwsx",
        pool: { max: 1500, min: 100, idle: 1000 } },
      read: {
        host: "192.168.99.100",
        username: "root",
        password: "wsxzaqwsx",
        pool: { max: 1500, min: 100, idle: 1000 } }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach((file) => {
    const model = sequelize.import(`${__dirname}/${file}`);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
