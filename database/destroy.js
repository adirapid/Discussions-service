/* eslint-disable no-throw-literal */
const models    = require("../models");

module.exports = async function (modelName, whereQuery) {
  try {
    const model = models[modelName];
    const res = await model.destroy({
      where: whereQuery
    });
    return res;
  } catch (err) {
    throw {
      name: "db error",
      message: {
        status: 502,
        title: "Bad Gateway",
        details: `err in destroy: ${err.message}`
      }
    };
  }
};
