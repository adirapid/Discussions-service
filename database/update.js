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
    return err.message;
  }
};
