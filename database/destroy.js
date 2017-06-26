const models    = require("../models");

module.exports = async function (modelName, whereQuery) {
  const model = models[modelName];
  const res = await model.destroy({
    where: whereQuery
  });
  return res;
};
