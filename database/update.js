const models    = require("../models");

module.exports = async function (modelName, whereQuery, updateParams) {
  const model = models[modelName];
  const res = await model.update(
    updateParams,
    {
      where: whereQuery
    });
  return res;
};
