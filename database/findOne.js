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
    return err.message;
  }
};
