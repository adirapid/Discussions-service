/* eslint-disable no-throw-literal */
const models    = require("../models");

module.exports = async function (modelName, rowData) {
  try {
    const model = models[modelName];
    const res = await model.create(rowData);
    return res;
  } catch (err) {
    throw {
      name: "db error",
      message: {
        status: 502,
        title: "Bad Gateway",
        details: `err in create: ${err.message}`
      }
    };
  }
};
