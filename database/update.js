/* eslint-disable no-throw-literal */
const models    = require("../models");

module.exports = async function (modelName, whereQuery, updateParams) {
  const model = models[modelName];
  try {
    const res = await model.update(
      updateParams,
      {
        where: whereQuery
      });
    return res;
  } catch (err) {
    throw {
      name: "db error",
      message: {
        status: 502,
        title: "Bad Gateway",
        details: `err in update: ${err.message}`
      }
    };
  }
};
