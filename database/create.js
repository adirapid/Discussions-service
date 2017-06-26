const models    = require("../models");

module.exports = async function (modelName, rowData) {
  const model = models[modelName];
  const res = await model.create(rowData);
  return res;
};
