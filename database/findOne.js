/* eslint-disable no-throw-literal */
const models    = require("../models");

module.exports = async function (modelName, whereQuery, include = [], sort = []) {
  try {
    const model = models[modelName];
    const res = await model.findOne({
      where: whereQuery,
      include,
      order: sort
    });
    return res;
  } catch (err) {
    throw {
      name: "db error",
      message: {
        status: 502,
        title: "Bad Gateway",
        details: `err in findOne: ${err.message}`
      }
    };
  }
};
