const models    = require("../models");

module.exports = async function (modelName, rowData) {
  try {
    const model = models[modelName];
    const res = await model.create(rowData);
    return res;
  } catch (err) {
    return err.message;
  }
};
