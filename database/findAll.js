const models    = require("../models");

module.exports = async function (modelName, whereQuery = {},
  needRaw = false, offset = 0,
  limit = 0, sort = [], include = []) {
  try {
    const sortArr = (typeof sort === "string") ? JSON.parse(sort) : sort;
    const includeArr = (typeof include === "string") ? JSON.parse(include) : include;
    const model = models[modelName];
    const res = await model.findAndCountAll({
      where: whereQuery,
      raw: needRaw,
      offset,
      limit,
      order: sortArr,
      include: includeArr,
    });
    return res;
  } catch (err) {
    return err.message;
  }
};
