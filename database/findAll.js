const models    = require("../models");

module.exports = async function (modelName, whereQuery = {},
  needRaw = false, offset = 0,
  limit = 0, sort = [], include = []) {
  try {
    const sortArr = (typeof sort === "string") ? JSON.parse(sort) : sort;
    const includeArr = (typeof include === "string") ? JSON.parse(include) : include;
    const model = models[modelName];
    const findQuery = {
      where: whereQuery,
      raw: needRaw,
      offset,
      order: sortArr,
      include: includeArr,
    };
    if (limit > 0) { findQuery.limit = limit; }
    const res = await model.findAndCountAll(findQuery);
    return res;
  } catch (err) {
    return err.message;
  }
};
